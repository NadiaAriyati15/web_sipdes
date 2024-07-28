<template>
  <form-produk :editMode="false" title="Tambah"/>
</template>
<script>
import formProduk from './form'
export default {
  components: {
    formProduk: formProduk
  }
}
</script>
