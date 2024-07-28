<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Posyandu" icon="emoji_events" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Posyandu" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Posyandu" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Posyandu</div>
                  <p class="text-caption">Form {{this.title}} data Posyandu</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.nama_posyandu"
                        label="Nama Posyandu"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Nama Posyandu']"
                      />
                    </div>
                    
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.lokasi"
                        label="Lokasi"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Lokasi Posyandu']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        type="date"
                        stack-label
                        filled
                        v-model="form.tgl"
                        label="Jadwal Posyandu"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Jadwal Posyandu']"
                      />
                    </div>
                    <div class="col">
                      <q-file filled bottom-slots dense v-model="form.gambar" label="Gambar" accept=".jpg, image/*">
                        <template v-slot:before>
                          <q-icon name="collections" />
                        </template>
                      </q-file>
                    </div>
                  </div>

                  <div class="q-mt-md">
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Cancel" v-if="this.editMode" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                    <q-btn label="Reset" v-else type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>


      </div>
    </div>
  </q-page>
</template>

<script>
import Lottie from 'components/lottie'
import * as animationData from 'assets/add_product.json'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import default icon marker fix
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

let listKategori = []
let listJenis = []

export default {
  name: 'PageIndex',
  components: {
    lottie: Lottie
  },
  props: {
    editMode: Boolean,
    title: String
  },
  data () {
    return {
      address: '',
      map: null,
      marker: null,
      defaultLocation: {
        lat: -5.4368452,
        lng: 105.2502415,
      },
      form: {
        nama_posyandu: null,
        lokasi: null,
        tgl: null,
        gambar: null,
      },
      oldImg: null,
      options: {
        options_kategori: [],
        options_status: [
          "On Going",
          "Selesai",
          "Pengajuan"
        ],
        options_jenis: []
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    this.getKategori()
    this.getJenis()
    if (this.editMode) {
      try {
        this.$api.get('posyandu/get-barang-by-id/' + this.$route.params.id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              console.log(res.data)
              const data = res.data.data
              this.form.nama_posyandu = data.nama_posyandu
              this.form.tgl = data.jadwal_posyandu
              this.form.lokasi = data.lokasi
              this.form.gambar = data.gambar
            }
          })
      } catch (e) {
        console.log(e.message)
        this.$showNotif('Terjadi ke !', 'negative')
      }
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    stop: function () {
      this.anim.stop()
    },
    play: function () {
      this.anim.play()
    },
    pause: function () {
      this.anim.pause()
    },
    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    },
    getKategori () {
      this.$api.get('type/gettype/Kategori')
        .then(res => {
          const list = res.data.result
          listKategori = list.map(kategori => {
            return kategori.name
          })
        })
    },
    filterKategori (val, update) {
      if (val === '') {
        update(() => {
          this.options.options_kategori = listKategori
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.options_kategori = listKategori.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    getJenis () {
      this.$api.get('type/gettype/Jenis')
        .then(res => {
          const list = res.data.result
          listJenis = list.map(jenis => {
            return jenis.name
          })
        })
    },
    filterJenis (val, update) {
      if (val === '') {
        update(() => {
          this.options.options_jenis = listJenis
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.options_jenis = listJenis.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      try {
        if (this.editMode) {
          const formData = new FormData()
          formData.append('gambar', this.form.image)
          formData.append('data', JSON.stringify({
            nama_posyandu: this.form.nama_posyandu,
            lokasi: this.form.lokasi,
            jadwal_posyandu: this.form.tgl,
          }))
          this.$api.put('posyandu/update/'+ this.$route.params.id, formData).then(res => {
            if (res.data.status !== true) {
              console.log(formData)
              this.$q.notify({
                message: 'Gagal Edit Data',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Berhasil Edit Data',
                color: 'green'
              })
              this.$router.push({ name: 'posyandu' })
            }
          })
        } else {
         const formData = new FormData()
         formData.append('gambar', this.form.gambar)
          formData.append('data', JSON.stringify({
            nama_posyandu: this.form.nama_posyandu,
            lokasi: this.form.lokasi,
            jadwal_posyandu: this.form.tgl,
          }))
          this.$api.post('posyandu/input', formData).then(res => {
            console.log(res);
            if (res.data.status !== true) {
              this.$q.notify({
                message: 'Gagal Kirim Data',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Berhasil Tambah Data',
                color: 'green'
              })
              this.$router.push({ name: 'posyandu' })
            }
          })
        }
      } catch (e) {
        console.error(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    onReset () {
      if (this.editMode) {
        this.$router.go(-1)
      } else {
        this.form.id_product = null
        this.form.name_produk = null
        this.form.kategori_product = null
        this.form.jenis_product = null
        this.form.hpp_product = null
        this.form.hargajual = null
        this.form.stok_produk = null
        this.form.keterangan = null
        this.form.image = null
      }
    }
  }
}
</script>

<style scoped>

</style>
