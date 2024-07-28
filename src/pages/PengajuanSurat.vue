<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md" flat bordered>
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Surat" icon="extension" />
          <q-breadcrumbs-el label="Pengajuan Surat" icon="message" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    :table-style="'counter-reset: cssRowCounter ' + ((pagination.page - 1) * pagination.rowsPerPage) + ';'"
                    title="Master Data Surat"
                    aria-label="Text"
                    class="text-h5"
                    :rows="rows"
                    flat
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                    :pagination="pagination"
                  >
                  <template v-slot:top>
                    <div class="col-md-4 col-lg-4 col-xs-12">
                      <div class="q-table__title">Master Data Pengajuan Surat</div>
                      <p class="text-caption">Data Pengajuan Surat yang di lakukan di dalam sistem</p>
                    </div>

                    <q-space />

                    <q-btn flat round color="primary" icon="search" @click="visibles = !visibles" size="md" class="q-mr-sm" />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input outlined debounce="300" placeholder="Placeholder" style="width:300px" color="primary" v-model="filter" dense />
                      </div>
                    </q-slide-transition>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td class="text-center"><span class="rowNumber"></span></q-td>
                    <q-td key="nik" :props="props">
                      {{ props.row.nik }}
                    </q-td>
                    <q-td key="nama_lengkap" :props="props">
                      {{ props.row.nama_lengkap }}
                    </q-td>
                    <q-td key="alamat_lengkap" :props="props">
                      {{ props.row.alamat_lengkap }}
                    </q-td>
                    <q-td key="jenis_kelamin" :props="props">
                      {{ props.row.jenis_kelamin }}
                    </q-td>
                    <q-td key="tempat_lahir" :props="props">
                      {{ props.row.tempat_lahir }}
                    </q-td>
                    <q-td key="agama" :props="props">
                      {{ props.row.agama }}
                    </q-td>
                    <q-td key="status_perkawinan" :props="props">
                      {{ props.row.status_perkawinan }}
                    </q-td>
                    <q-td key="jenis_surat" :props="props">
                      {{ props.row.jenis_surat }}
                    </q-td>
                    <q-td key="tanggal_pengajuan" :props="props">
                      {{ props.row.tanggal_pengajuan }}
                    </q-td>
                    <q-td key="status_pengajuan" :props="props" class="text-green">
                        <div v-if="props.row.status_pengajuan == 'Diterima'">
                          {{ props.row.status_pengajuan }}
                        </div>
                        <div v-if="props.row.status_pengajuan == 'Ditolak'" class="text-red">
                          {{ props.row.status_pengajuan }}
                        </div>
                        <div v-if="props.row.status_pengajuan == 'Dalam Proses'" class="text-orange">
                          {{ props.row.status_pengajuan }}
                        </div>
                      </q-td>
                    <q-td key="file" :props="props">
                      <div v-if="props.row.file == null " class="text-red">
                        <div>File Kosong</div>
                      </div>
                      <div v-else>
                        <q-btn label="File" color="green" outline size="sm"  @click="downloadPDF(props.row._id)"  class="q-ml-sm" no-caps />
                      </div>
                    </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn label="Aksi" color="green" size="sm" :to="{ name:'edit_pengajuan_surat', params:{ id: props.row._id } }"  class="q-ml-sm" no-caps />
                      </q-td>
                    </q-tr>
                  </template>

                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <q-dialog v-model="detail.visible">
          <q-card>
            <q-card-section>
              <div class="text-h6">#Data Pembelian</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <q-table
                :rows="detail.rows"
                row-key="name"
                flat
                :columns="detail.columns"
                :hide-pagination="true"
              >
                <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td class="text-center"><span class="rowNumber"></span></q-td>
                      <q-td key="nik" :props="props">
                        {{ props.row.barang.nik }}
                      </q-td>
                      <q-td key="jenis_surat" :props="props">
                        {{ props.row.barang.jenis_surat }}
                      </q-td>
                      <q-td key="tanggal_pengajuan" :props="props">
                        {{ props.row.tanggal_pengajuan }}
                      </q-td>
                      <q-td key="status_pengajuan" :props="props" class="text-primary">
                        <div v-if="props.row.status_pengajuan == 'Diterima'">
                          {{ props.row.status_pengajuan }}
                        </div>
                        <div v-if="props.row.status_pengajuan == 'Ditolak'">
                          {{ props.row.status_pengajuan }}
                        </div>
                        <div v-if="props.row.status_pengajuan == 'Dalam Proses'">
                          {{ props.row.status_pengajuan }}
                        </div>
                      </q-td>
                      <q-td key="file" :props="props">
                        <div v-if="file.length == 0">
                            <div>File Kosong</div>
                        </div>
                        <div v-else>
                            <div>File </div>
                        </div>
                      </q-td>
                      <q-td key="gambar" :props="props">
                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-avatar rounded size="100px">
                              <q-img :src="`${$imgUrl}/gambar-barang/${props.row.barang.gambar}`" @click="tampil(props.row.barang.gambar)"/>
                            </q-avatar>
                              <q-dialog ref="dialog">
                                  <q-card class="my-card">
                                      <q-img :src="`${$imgUrl}/gambar-barang/${fotoDiri}`" style="width: 100%; height: 100%;"/>
                                  </q-card>
                              </q-dialog>
                          </q-item-section>
                        </q-item>
                      </q-td>
                      <q-td key="subTotal" :props="props">
                        {{ props.row.subTotal }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat label="Ok" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>

</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PageIndex',
  data () {
    return {
      file: null,
      nama: null,
      url: null,
      visibles: false,
      card: ref(false),
      pagination: {
        rowsPerPage: 10
      },
      options: [],
      namaCustomer: [],
      fotoDiri: null,
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        { name: 'no', label: 'No', field: 'no' },
        { name: 'nik', required: true, label: 'NIK', align: 'left', field: 'nik', sortable: true },
        { name: 'nama_lengkap', required: true, label: 'Nama Lengkap', align: 'left', field: 'nama_lengkap', sortable: true },
        { name: 'alamat_lengkap', required: true, label: 'Alamat', align: 'left', field: 'alamat_lengkap', sortable: true },
        { name: 'jenis_kelamin', required: true, label: 'Jenis Kelamin', align: 'left', field: 'jenis_kelamin', sortable: true },
        { name: 'tempat_lahir', required: true, label: 'Tempat Lahir', align: 'left', field: 'tempat_lahir', sortable: true },
        { name: 'agama', required: true, label: 'agama', align: 'left', field: 'agama', sortable: true },
        { name: 'status_perkawinan', required: true, label: 'Status Perkawinan', align: 'left', field: 'status_perkawinan', sortable: true },
        { name: 'jenis_surat', required: true, label: 'Jenis Surat', align: 'left', field: 'jenis_surat', sortable: true },
        { name: 'tanggal_pengajuan', required: true, label: 'Tanggal Pengajuan', align: 'left', field: 'tanggal_pengajuan', sortable: true },
        { name: 'status_pengajuan', required: true, label: 'Status Pengajuan', align: 'left', field: 'status_pengajuan', sortable: true },
        { name: 'file', required: true, label: 'File Surat', align: 'left', field: 'file', sortable: true },
        { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' }
      ],
      rows: [],
      detail: {
        visible: false,
        pelanggan: null,
        grandTotal: null,
        columns: [
          { name: 'no', label: 'No', field: 'no' },
          { name: 'nik', required: true, label: 'NIK', align: 'left', field: 'nik', sortable: true },
          { name: 'nama_lengkap', required: true, label: 'Nama Lengkap', align: 'left', field: 'nama_lengkap', sortable: true },
          { name: 'alamat_lengkap', required: true, label: 'Alamat', align: 'left', field: 'alamat_lengkap', sortable: true },
          { name: 'jenis_kelamin', required: true, label: 'Jenis Kelamin', align: 'left', field: 'jenis_kelamin', sortable: true },
          { name: 'tempat_lahir', required: true, label: 'Tempat Lahir', align: 'left', field: 'tempat_lahir', sortable: true },
          { name: 'agama', required: true, label: 'agama', align: 'left', field: 'agama', sortable: true },
          { name: 'status_perkawinan', required: true, label: 'Status Perkawinan', align: 'left', field: 'status_perkawinan', sortable: true },
          { name: 'jenis_surat', required: true, label: 'Jenis Surat', align: 'left', field: 'jenis_surat', sortable: true },
          { name: 'tanggal_pengajuan', required: true, label: 'Tanggal Pengajuan', align: 'left', field: 'tanggal_pengajuan', sortable: true },
          { name: 'status_pengajuan', required: true, label: 'Status Pengajuan', align: 'left', field: 'status_pengajuan', sortable: true },
          { name: 'file', required: true, label: 'File Surat', align: 'left', field: 'file', sortable: true },
          { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' }
        ],
        rows: []
      }
    }
  },
  created () {
    this.getCustomer()
  },
  methods: {
    downloadPDF (id) {
      try {
        this.$api.get('pengajuan_surat/get-id/' + id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              console.log(res.data.data)

              const data = res.data.data
              this.file = data.file
              this.url = 'http://localhost:4000/gambar-barang/' + this.file
              console.log(this.url)
              const fileName = 'your-pdf-file.pdf'
              this.downloadFile(this.url, data.jenis_surat)
            }
          })
      } catch (e) {
        console.log(e.message)
        this.$showNotif('Terjadi ke !', 'negative')
      }
    },
    downloadFile (url, fileName) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    getCustomer () {
      try {
        this.$api.get('pengajuan_surat/get-all-barang')
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              const data = res.data.data
              this.rows = data
              data.reverse()
              console.log(this.rows)
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    tampil (id) {
      this.$refs.dialog.show(
        this.fotoDiri = id
      )
    },
    accept (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Setuju untuk menerima transaksi?',
        color: 'green',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.put('/transaksi/updateWeb/' + id, {
            status: 'Selesai'
          }).then(res => {
            if (res.data.status !== true) {
              this.$q.notify({
                message: 'Status Gagal',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Status Berhasil ',
                color: 'green'
              })
              this.getCustomer()
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    reject (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Setuju untuk menolak transaksi?',
        color: 'red',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.put('/transaksi/updateWeb/' + id, {
            status: 'Ditolak'
          }).then(res => {
            if (res.data.status !== true) {
              this.$q.notify({
                message: 'Status Gagal',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Status Berhasil ',
                color: 'green'
              })
              this.getCustomer()
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    showDetail (detailTransaksi) {
      // console.log(detailTransaksi)
      const newData = detailTransaksi.map(r => {
        return {
          barang: r.barang,
          subTotal: r.subtotal
        }
      })
      this.detail.visible = true
      this.detail.rows = newData
      console.log(newData)
    }
  }
}
</script>

<style scoped>
.rowNumber::before {
  counter-increment: cssRowCounter;
  content: counter(cssRowCounter) ". ";
}
.my-card {
  width: 100%;
}
.color {
  background-color: lightblue;
  color: red;
}
</style>
