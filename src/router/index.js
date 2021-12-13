import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      meta: { title: '登录', needLogIn: false }
    },
    {
      path: '/register',
      component: () => import('@/views/register/index'),
      meta: { title: '注册', needLogIn: false }
    },
    {
      path: '/404',
      component: () => import('@/views/404/index'),
      meta: { title: '404', needLogIn: false }
    },
    {
      path: '',
      component: () => import('@/views/layout/layout'),
      children: [
        {
          path: '',
          component: () => import('@/views/index/index'),
          meta: { title: '主页', needLogIn: false }
        },
        {
          path: '/words/:id',
          component: () => import('@/views/words/index'),
          meta: { title: '查看话语', needLogIn: false }
        },
        {
          path: '/mywords',
          component: () => import('@/views/mywords/index'),
          meta: { title: '我的话语', needLogIn: true }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogIn) {
    if (router.app.$store.state.user.loggedIn)
      next();
    else {
      router.app.$message('请先登录');
      next({ path: '/login' })
    }
  }
  next();
});

router.beforeEach((to,from,next) => {
  document.title = to.meta.title + ' - 秘话'
  next()
})

export default router