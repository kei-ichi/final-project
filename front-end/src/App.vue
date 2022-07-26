<template>
  <div>
    <button @click="get">Get data</button>
    <button @click="post">Put data</button>

    <div class="user">
      <div class="user__card" v-for="(user, index) in users">
        <ul class="user__list">
          <li class="user__list-item">{{ user.id}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

let users = ref([]);

async function get() {
  const result = await axios({
    method: 'get',
    url: 'http://localhost:5000'
  })
  //console.log(result)

  users.value = [...result.data];

  console.log(users)
}

async function post() {
  const result = await axios({
    method: 'post',
    url: 'http://localhost:5000'
  })
  console.log(result)
}



</script>
