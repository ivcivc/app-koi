import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../services/store'

import Home from '@/components/home/Home'

import AdminPages from '@/components/admin/AdminPages'
import AdminUsers from '@/components/admin/AdminUsers'

import Auth from '@/components/auth/Auth'
import Forgot from '@/components/auth/Forgot'

import Pessoa from '@/components/pessoa/Pessoa'
import PessoaLoc from '@/components/pessoa/PessoaLoc'

import LocalLoc from '@/components/diversos/LocalLoc'
import Local from '@/components/diversos/Local'

import TreinamentoLoc from '@/components/diversos/TreinamentoLoc'
import Treinamento from '@/components/diversos/Treinamento'

import EventoLoc from '@/components/evento/EventoLoc.vue'
import Evento from '@/components/evento/Evento.vue'

import Globalize from '@/components/globalize'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
    {
        name: 'globalize',
        path: '/globalize',
        component: Globalize,
    },
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'pessoaLoc',
        path: '/pessoaLoc',
        component: PessoaLoc,
    },
    {
        name: 'pessoa',
        path: '/pessoa/:id',
        props: true,
        component: Pessoa,
        beforeEnter: (to, from, next) => {
            console.log('antes da rota PESSOA ', to)
            next()
        },
    },
    {
        name: 'localLoc',
        path: '/localLoc',
        component: LocalLoc,
    },
    {
        name: 'local',
        path: '/local/:id',
        props: true,
        component: Local,
        beforeEnter: (to, from, next) => {
            console.log('antes da rota LOCAL ', to)
            next()
        },
    },

    {
        name: 'eventoLoc',
        path: '/eventoLoc',
        component: EventoLoc,
    },
    {
        name: 'evento',
        path: '/evento/:id',
        props: true,
        component: Evento,
    },

    {
        name: 'treinamentoLoc',
        path: '/treinamentoLoc',
        component: TreinamentoLoc,
    },
    {
        name: 'treinamento',
        path: '/treinamento/:id',
        props: true,
        component: Treinamento,
        beforeEnter: (to, from, next) => {
            console.log('antes da rota TREINAMENTO ', to)
            next()
        },
    },

    {
        name: 'admin',
        path: '/admin',
        component: AdminPages,
        meta: { requiresAdmin: true },
    },

    {
        name: 'adminUsers',
        path: '/adminUsers',
        component: AdminUsers,
        meta: { requiresAdmin: true },
    },

    {
        name: 'auth',
        path: '/auth',
        component: Auth,
    },
    {
        name: 'forgot',
        path: '/forgot',
        component: Forgot,
    },
]

const router = new VueRouter({
    //mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    if (to.path === '/forgot/') {
        store.state.user.isForgot = true
        return next()
    }

    if (!store.state.user.isForgot) {
        if (to.matched.some(record => record.meta.requiresAdmin)) {
            const user = JSON.parse(json)
            user && user.admin ? next() : next({ path: '/' })
        } else {
            next()
        }
    }
})

export default router
