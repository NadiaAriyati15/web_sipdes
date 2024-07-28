<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Pengaduan" icon="emoji_events" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Pengaduan" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Pembangunan" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Pembangunan</div>
                  <p class="text-caption">Form {{this.title}} data pembangunan</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.nik"
                        label="NIK"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data NIK']"
                      />
                    </div>
                    
                    <div class="col">
                      <q-input
                      readonly
                        filled
                        v-model="form.nama_lengkap"
                        label="Nama Lengkap"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Nama Lengkap']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                      readonly
                        filled
                        v-model="form.alamat_lengkap"
                        label="Alamat Lengkap"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.jenis_kelamin"
                        label="Jenis Kelamin"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.tempat_lahir"
                        label="Tempat Lahir"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.tanggal_lahir"
                        label="tanggal_lahir"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.agama"
                        label="Agama"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.status_perkawinan"
                        label="Status Perkawinan"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.jenis_surat"
                        label="Jenis Surat"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.tanggal_pengajuan"
                        label="Tanggal Pengajuan"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-file filled bottom-slots dense v-model="form.file" label="File Surat" >
                        <template v-slot:before>
                          <q-icon name="description" />
                        </template>
                      </q-file>
                    </div>
                  </div>

                  <div class="row q-gutter-sm" >
                    <div class="col">
                      <q-select
                        :options="opsi"
                        filled
                        v-model="form.status_pengajuan"
                        label="Status"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Status Tidak Boleh Kosong']"
                      />
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
      opsi: [
        "Dalam Proses",
        "Ditolak",
        "Diterima"
      ],
      map: null,
      marker: null,
      defaultLocation: {
        lat: -5.4368452,
        lng: 105.2502415,
      },
      image: null,
      form: {
       nik: null,
       nama_lengkap: null,
       alamat_lengkap: null,
       jenis_kelamin: null,
       tempat_lahir: null,
       tanggal_lahir: null,
       agama: null,
       status_perkawinan: null,
       jenis_surat: null,
       tanggal_pengajuan: null,
       status_pengajuan: null,
       file: null,
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
    console.log("APA INI")
    if (this.editMode) {
      try {
        this.$api.get('pengajuan_surat/get-id/' + this.$route.params.id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              
              console.log(res.data)
              const data = res.data.data

              this.form.nik = data.nik,
              this.form.nama_lengkap = data.nama_lengkap,
              this.form.alamat_lengkap = data.alamat_lengkap,
              this.form.jenis_kelamin = data.jenis_kelamin,
              this.form.tempat_lahir = data.tempat_lahir,
              this.form.tanggal_lahir = data.tanggal_lahir,
              this.form.agama = data.agama,
              this.form.status_perkawinan = data.status_perkawinan,
              this.form.jenis_surat = data.jenis_surat,
              this.form.tanggal_pengajuan = data.tanggal_pengajuan,
              this.form.status_pengajuan = data.status_pengajuan,
              this.form.file = data.file
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
          formData.append('gambar', this.form.file)
          formData.append('data', JSON.stringify({
            nik: this.form.nik,
            judul_pengaduan: this.form.judul_pengaduan,
            deskripsi: this.form.deskripsi,
            alamat: this.form.alamat,
            no_hp: this.form.no_hp,
            nama: this.form.nama,
            tgl: this.form.tgl,
            status_pengajuan: this.form.status_pengajuan,
          }))
          this.$api.put('pengajuan_surat/update/'+ this.$route.params.id, formData).then(res => {
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
              this.$router.push({ name: 'pesanan' })
            }
          })
        } else {
         const formData = new FormData()
         formData.append('gambar', this.form.image)
          formData.append('data', JSON.stringify({
            namaPembangunan: this.form.namaPembangunan,
            luas: this.form.luas,
            alamat: this.address,
            deskripsi: this.form.deskripsi,
            status_pengajuan: this.form.status_pengajuan,
          }))
          this.$api.post('pembangunan/input', formData).then(res => {
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
              this.$router.push({ name: 'pengaduan' })
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
.image-container {
  width: 100%;
  height: 400px; /* Atur tinggi sesuai kebutuhan Anda */
  position: relative;
}
.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Atur agar gambar menutupi seluruh kontainer */
}
</style>
