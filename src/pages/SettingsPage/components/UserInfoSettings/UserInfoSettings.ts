import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted, ref, reactive } from 'vue';

import { UpdateAdminBody } from '@api';
import { Modal, FormInput, CustomButton, List, SvgIcon } from '@shared/components';
import { supportedImageTypesString } from '@shared/constants';
import { InputFileEvent } from '@shared/types';
import {
  useAuthStore,
  getAdminInfoThunk,
  useGetAdminInfoStore,
  updateAdminInfoThunk,
  useUpdateAdminInfoStore,
  useGetAvatarStore,
  useChangeAvatarStore,
  changeAvatarThunk,
} from '@store';

import { prepareFormData } from './UserInfoSettingsUtils';
import { formValidationRules, list } from './constants';

export default defineComponent({
  components: {
    Modal,
    FormInput,
    CustomButton,
    List,
    SvgIcon,
  },
  setup() {
    const { user } = storeToRefs(useAuthStore());
    const updateInfoStore = useUpdateAdminInfoStore();
    const infoStore = useGetAdminInfoStore();
    const avatarStore = useGetAvatarStore();
    const changeAvatarStore = useChangeAvatarStore();
    const { loading: updateLoading } = storeToRefs(updateInfoStore);
    const { loading: infoLoading } = storeToRefs(infoStore);
    const { loading: changeAvatarLoading } = storeToRefs(changeAvatarStore);
    const showModal = ref<'info' | 'avatar' | null>(null);
    const avatar = ref<{ url: string | null; rawData: File | null }>({ url: avatarStore.data, rawData: null });

    const formData = reactive<Record<keyof UpdateAdminBody, string>>({
      username: '',
      email: '',
      password: '',
    });

    onMounted(getAdminInfoThunk);
    onUnmounted(() => {
      infoStore.abortController?.abort();
      infoStore.$reset();
      updateInfoStore.$reset();
    });

    const v$ = useVuelidate(formValidationRules, formData, { $lazy: true });

    const closeModal = () => (showModal.value = null);

    const openAvatarModal = () => {
      avatar.value = { url: avatarStore.data, rawData: null };
      showModal.value = 'avatar';
    };

    const openInfoModal = () => {
      formData.username = user.value?.username ?? '';
      formData.email = user.value?.email ?? '';
      formData.password = '';
      showModal.value = 'info';
    };

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;

      updateAdminInfoThunk(prepareFormData(formData), () => {
        showModal.value = null;
      });
    };

    const data = list.map((item) => ({ title: item.title, value: user.value?.[item.key] ?? '-' }));

    const onFileChange = (event: InputFileEvent) => {
      const file = event.target?.files?.[0];
      if (file) {
        avatar.value = {
          url: URL.createObjectURL(file),
          rawData: file,
        };
      }
    };

    const removeAvatar = () => (avatar.value = { url: null, rawData: null });

    const changeAvatar = () => {
      if (avatar.value.url !== null && avatar.value.rawData === null) {
        showModal.value = null;
      } else {
        changeAvatarThunk(avatar.value.url, avatar.value.rawData, () => (showModal.value = null));
      }
    };

    return {
      user,
      data,
      infoLoading,
      updateLoading,
      showModal,
      closeModal,
      openAvatarModal,
      openInfoModal,
      formData,
      v$,
      onSubmit,
      avatar,
      onFileChange,
      supportedImageTypesString,
      removeAvatar,
      changeAvatarLoading,
      changeAvatar,
    };
  },
});
