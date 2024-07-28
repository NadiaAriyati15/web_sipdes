<template>
  <img src="~assets/kantor.png" class="wave" alt="login-wave" v-if="$q.screen.md || $q.screen.xl || $q.screen.lg">
    <div v-if="$q.screen.md || $q.screen.lg || $q.screen.xl" style="margin-top: 60px;"></div>
    <div v-if="$q.screen.xs || $q.screen.sm" style="margin-top: 30px;"></div>
    <div class="flex flex-center">
      <q-card v-if="$q.screen.md || $q.screen.lg || $q.screen.xl">
        <q-card-section>
          <!-- <q-avatar size="103px" class="absolute-center shadow-10">
             <img src="../assets/lockk.png" alt="">
          </q-avatar> -->
        </q-card-section>
        <q-card-section>
          <div>
            <div class="flex flex-center" style="margin-top:-20px">
              <img src="../../assets/lamsel.png" style="width: 150px;">
            </div>
            <div class="col text-center" style="margin-top:-20px">
              <h4>Sign In</h4>
              <p class="text-center text-grey q-pl-md q-pr-md" style="margin-top:-40px">
                Silahkan akses portal admin untuk pengelolaan data lebih lanjut
              </p>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            style="margin-top: -50px"
            class="q-gutter-sm q-pa-md">
            <q-input label="Email" v-model="username"
             :rules="[ val => val && val.length > 0 || 'Lengkapi data Email']"
            >
            </q-input>
            <q-input label="Password" type="password" v-model="password"
             :rules="[ val => val && val.length > 0 || 'Lengkapi data password']"
            >
            </q-input>
            <div>
              <!-- <q-btn type="reset"  outline rounded label="Reset Data" style="width:155px" class="items-center" unelevated color="primary" /> -->
              <!-- <q-btn color="primary" type="submit" label="Login" class="full-width"/>
               -->
                <q-btn type="submit" class="full-width" color="primary" label="Sign in now" unelevated />
              <div class="text-center q-mt-sm q-gutter-lg">
                <!-- <router-link class="text-black" to="/login">Belum Punya Akun? <span class="text-bold">Daftar</span></router-link> -->
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
      <q-card v-if="$q.screen.xs || $q.screen.sm" style="width: 80%;">
        <q-card-section>
          <!-- <q-avatar size="103px" class="absolute-center shadow-10">
             <img src="../assets/lockk.png" alt="">
          </q-avatar> -->
        </q-card-section>
        <q-card-section>
          <div>
            <div class="flex flex-center" style="margin-top:-20px">
              <img src="../../assets/lamsel.png" style="width: 200px;">
            </div>
            <div class="col text-center" style="margin-top:-20px">
              <h4>Sign In</h4>
              <p class="text-center text-grey q-pl-md q-pr-md" style="margin-top:-40px">
                Silahkan akses portal admin
              </p>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            style="margin-top: -50px"
            class="q-gutter-sm q-pa-md">
            <q-input label="Email" v-model="username"
             :rules="[ val => val && val.length > 0 || 'Lengkapi data Email']"
            >
            </q-input>
            <q-input label="Password" type="password" v-model="password"
             :rules="[ val => val && val.length > 0 || 'Lengkapi data password']"
            >
            </q-input>
            <div>
                <q-btn type="submit" class="full-width" color="primary" label="Sign in now" unelevated />
              <div class="text-center q-mt-sm q-gutter-lg">
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
/* eslint-disable */
import { LocalStorage } from 'quasar'

export default {
  
  name: 'Login',
  // components: {
  //   lottie: Lottie
  // },
  data () {
    return {
      username  : null,
      password: null,
    }
  },
  methods: {
        onSubmit () {
      try {
        this.$api.post('users/login', {
          email: this.username,
          password: this.password
        }).then(res => {
          console.log(res.data.data.role)
          if (res.data.status == true && res.data.data.role == 'admin') {
           this.$q.notify({
              message: 'Berhasil Login',
              color: 'green'
            })
            LocalStorage.set('user', res.data.data)
            this.$router.push({ name: 'pembangunan' })
          } else {
            this.$q.notify({
              message: 'Username atau Password Salah',
              color: 'red'
            })
          }
        })
      } catch (e) {
            this.$q.notify({
              message: 'Kesalahan Server Error',
              color: 'red'
            })
      }
    },
    },
    onReset () {
      this.Username = null
      this.password = null
    }
}
</script>

<style scoped>
.wave {
  position: fixed;
  width: 100%;
  /* height: 100%; */
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>

