import Vue from "vue";
import Router from "vue-router";

import auth from "./auth";

import Home from "./views/home";
import Profile from "./views/profile";
import DisplayData from "./views/display-data";
import defaultLayout from "./layouts/side-nav-outer-toolbar";
import simpleLayout from "./layouts/single-card";

import Pessoas from "./views/pessoa/pessoas";
import Pessoa from "./views/pessoa/pessoa";

import Receber from "./views/financeiro/receber";
import Recebers from "./views/financeiro/recebers";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Home
      }
    },
    {
      path: "/pessoas",
      name: "pessoas",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Pessoas
      }
    },

    {
      name: "pessoa",
      path: "/pessoa",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: Pessoa
      }
    },

    {
      name: "pessoa",
      path: "/pessoa/:id",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: Pessoa
      }
    },

    {
      name: "recebers",
      path: "/recebers",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: Recebers
      }
    },

    {
      name: "receber",
      path: "/receber/:id",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: Receber
      }
    },

    {
      path: "/locais",
      name: "locais",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: () => import("./views/local/locais")
      }
    },

    {
      name: "local",
      path: "/local",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import("./views/local/local")
      }
    },

    {
      name: "local",
      path: "/local/:id",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import("./views/local/local")
      }
    },

    {
      path: "/treinamentos",
      name: "treinamentos",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: () => import("./views/treinamento/treinamentos")
      }
    },

    {
      name: "treinamento",
      path: "/treinamento",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import("./views/treinamento/treinamento")
      }
    },

    {
      name: "treinamento",
      path: "/treinamento/:id",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import("./views/treinamento/treinamento")
      }
    },

    {
      path: "/tipoNegociacoes",
      name: "tipoNegociacoes",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: () => import("./views/tipoNegociacao/tipoNegociacoes")
      }
    },

    {
      path: "/tipoNegociacao/:id",
      name: "tipoNegociacao",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import("./views/tipoNegociacao/tipoNegociacao")
      }
    },

    {
      path: "/eventos",
      name: "eventos",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: () => import("./views/evento/eventos")
      }
    },

    /*{
      name: "evento",
      path: "/evento",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import("./views/evento/evento")
      }
    },*/

    {
      path: "/evento/:id",
      meta: { requiresAuth: true },
      props: true,
      components: {
        layout: defaultLayout,
        content: () => import("./views/evento/evento")
      }
      /*children: [
        {
          path: "",
          name: "evento",
          props: true,
          content: () => import("./views/evento/evento")
        },
        {
          path: ":id",
          name: "eventoEdit",
          props: true,
          content: () => import("./views/evento/evento")
        }
      ]*/
    },

    {
      path: "/profile",
      name: "profile",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Profile
      }
    },
    {
      path: "/display-data",
      name: "display-data",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: DisplayData
      }
    },

    {
      path: "/login-form",
      name: "login-form",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/login-form")
      }
    },

    {
      path: "/forgot",
      name: "forgot",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: () => import(/* webpackChunkName: "login" */ "./views/forgot")
      }
    },

    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.authenticated();

  if (to.name === "login-form" && isAuthenticated) {
    next({ name: "home" });
  }

  if (to.name === "forgot" && isAuthenticated) {
    next({ name: "forgot" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
