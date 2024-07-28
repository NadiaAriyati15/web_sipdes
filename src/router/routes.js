/* eslint-disable */
const routes = [
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "user",
        component: () => import("pages/User.vue"),
      },
      {
        path: "edit_berita/:id",
        name: "edit_berita",
        component: () => import("src/pages/berita/edit.vue"),
      },
      {
        path: "",
        name: "add_berita",
        component: () => import("src/pages/berita/form.vue"),
      },
      {
        path: "edit_posyandu/:id",
        name: "edit_posyandu",
        component: () => import("src/pages/posyandu/edit.vue"),
      },
      {
        path: "",
        name: "add_posyandu",
        component: () => import("src/pages/posyandu/form.vue"),
      },
      {
        path: "",
        name: "berita",
        component: () => import("src/pages/berita.vue"),
      },
      {
        path: "",
        name: "posyandu",
        component: () => import("src/pages/posyandu.vue"),
      },
      {
        path: "",
        name: "pembangunan",
        component: () => import("src/pages/PetaPembangunan.vue"),
      },
      {
        path: "",
        name: "pengaduan",
        component: () => import("src/pages/Pengaduan.vue"),
      },
      {
        path: "pengaduan/:id",
        name: "edit_pengaduan",
        component: () => import("src/pages/pengaduan/edit.vue"),
      },
      {
        path: "edit_pengajuan_surat/:id",
        name: "edit_pengajuan_surat",
        component: () => import("src/pages/pengajuan_surat/edit.vue"),
      },
      {
        path: "",
        name: "pesanan",
        component: () => import("src/pages/PengajuanSurat.vue"),
      },
      {
        path: "",
        name: "add_produk",
        component: () => import("src/pages/pembangunan/form.vue"),
      },
      {
        path: "edit/:id",
        name: "edit_produk",
        component: () => import("src/pages/pembangunan/edit.vue"),
      },
    ],
  },
  {
    name: "LoginIn",
    path: "/",
    component: () => import("src/pages/access/Login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
