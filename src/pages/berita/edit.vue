<template>
  <form-produk :editMode="true" title="Edit"/>
</template>
<script>
import formProduk from './form'
export default {
  components: {
    formProduk: formProduk
  }
}
</script>
