<template>
  <div class="container">
    <h1 class="region">東京リージョン： 22卒メンバー</h1>

    <div class="user">
      <div class="user__card" v-for="(user, index) in users">
        <h4 class="user__name">{{ user.name }}</h4>

        <div class="user__profile-img">
          <img class="user__img" :src="user.imgUrl" :alt="user.name" />
        </div>

        <ul class="user__list">
          <li class="user__list-item">{{ user.strength_1 }}</li>
          <li class="user__list-item">{{ user.strength_2 }}</li>
          <li class="user__list-item">{{ user.strength_3 }}</li>
          <li class="user__list-item">{{ user.strength_4 }}</li>
          <li class="user__list-item">{{ user.strength_5 }}</li>
        </ul>
      </div>
    </div>

    <div class="btn-group">
      <button
        class="btn"
        :class="users.length === 0 ? 'btn--post' : 'btn--disabled'"
        @click="generateUsersData"
        :disabled="users.length !== 0"
      >
        Generate Data
      </button>

      <button
        class="btn"
        :class="users.length === 0 ? 'btn--disabled' : 'btn--delete'"
        @click="deleteUsersData"
        :disabled="users.length === 0"
      >
        Delete Data
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

let users = ref([]);

async function generateUsersData() {
  const result = await axios({
    method: 'post',
    url: 'http://localhost:5000',
  });
  console.log(result);

  users.value = [...result.data];
}

async function deleteUsersData() {
  const result = await axios({
    method: 'delete',
    url: 'http://localhost:5000',
  });

  // Clear users value
  users.value = [];

  console.log(result);
}

// Get users data when mounted
onMounted(async () => {
  const result = await axios({
    method: 'get',
    url: 'http://localhost:5000',
  });

  console.log(result);

  if (result.data.length !== 0) {
    users.value = [...result.data];

    //console.log(users.value);
  }
});
</script>
