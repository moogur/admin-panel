import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, ref } from 'vue';

import { SvgIcon, Modal } from '@shared/components';
import { getDateToShow, convertStatusEnumToTag, convertGenderEnumToTag } from '@shared/utils';
import { getUserInfoThunk, useGetUserInfoStore } from '@store';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  setup(properties) {
    const userInfoStore = useGetUserInfoStore();
    const { data: userInfo } = storeToRefs(userInfoStore);
    const showModal = ref(false);

    onUnmounted(() => {
      userInfoStore.abortController?.abort();
      userInfoStore.$reset();
    });

    const openModal = () => {
      getUserInfoThunk(properties.userId, () => {
        showModal.value = true;
      });
    };

    return {
      userInfo,
      showModal,
      openModal,
      getDateToShow,
      convertStatusEnumToTag,
      convertGenderEnumToTag,
    };
  },
});
