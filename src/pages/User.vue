<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md" flat bordered>
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="User" icon="extension" />
          <q-breadcrumbs-el label="Data User" icon="person" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    :table-style="'counter-reset: cssRowCounter ' + ((pagination.page - 1) * pagination.rowsPerPage) + ';'"
                    title="Master Data Customers"
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
                      <div class="q-table__title">Master Data User</div>
                      <p class="text-caption">Data User yang di lakukan di dalam sistem</p>
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
                      {{ props.row.namaLengkap }}
                    </q-td>
                    <q-td key="namaLengkap" :props="props">
                      {{ props.row.namaLengkap }}
                    </q-td>
                    <q-td key="email" :props="props">
                      {{ props.row.email }}
                    </q-td>
                    <q-td key="phoneNumber" :props="props">
                      {{ props.row.email }}
                    </q-td>
                    <q-td key="role" :props="props">
                      {{ props.row.role }}
                    </q-td>
                    <q-td key="gambar" :props="props">
                      <q-item clickable v-ripple>
                        <q-item-section>
                          <q-avatar rounded size="100px">
                            <q-img :src="`${$imgUrl}/gambar-barang/${props.row.gambar}`" />
                          </q-avatar>
                        </q-item-section>
                      </q-item>
                    </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn round outline color="red" size="sm" icon="delete" @click="this.delete(props.row._id)" no-caps class="q-ml-sm" />
                        <q-btn round outline color="green" size="sm" icon="edit" :to="{ name:'edit_produk', params:{ id: props.row._id } }"  class="q-ml-sm" no-caps />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
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
      card: ref(false),
      pagination: {
        rowsPerPage: 10,
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
          { name: 'namaLengkap', required: true, label: 'Nama Lengkap', align: 'left', field: 'namaLengkap', sortable: true },
          { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
          { name: 'phoneNumber', required: true, label: 'No HandPhone', align: 'left', field: 'phoneNumber', sortable: true },
          { name: 'role', required: true, label: 'Role', align: 'left', field: 'role', sortable: true },
      ],
      rows: []
    }
  },
  created () {
    this.getCustomer()
  },
  methods: {
    getCustomer () {
      try {
        this.$api.get('users/user-get-all')
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
    delete (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.delete('/barang/delete/' + id).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.getCustomer()
              this.$showNotif(res.data.message, 'positive')
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
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
</style>
