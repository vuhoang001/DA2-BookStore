import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import auth from '@/middlewares/auth.middleware';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/client/components/LayoutClient.vue'),
            // meta: {
            //     middleware: [auth]
            // },
            children: [
                {
                    path: '',
                    name: 'DashboardClient',
                    // meta: {
                    //     middleware: [auth]
                    // },
                    component: () => import('@/views/client/DashboardClient.vue')
                },
                {
                    path: 'detail-book/:slug',
                    name: 'DetailBook',
                    component: () => import('@/views/client/DetailBook.vue')
                },
                {
                    path: '/author',
                    name: 'authors',
                    component: () => import('@/views/client/DetailAuthor.vue')
                },
                {
                    path: '/author/:slug',
                    name: 'AuthorClient',
                    component: () => import('@/views/client/AuthorClient.vue')
                },
                {
                    path: '/cart',
                    name: 'cart',
                    meta: {
                        middleware: [auth]
                    },
                    component: () => import('@/views/client/CartClient.vue')
                },
                {
                    path: '/checkout',
                    name: 'checkout',
                    meta: {
                        middleware: [auth]
                    },
                    component: () => import('@/views/client/Checkout.vue')
                },
                {
                    path: '/books',
                    name: 'books',
                    component: () => import('@/views/client/BookClient.vue')
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('@/views/client/Profile.vue')
                },
                {
                    path: '/favorite',
                    name: 'favorite',
                    component: import('@/views/client/Favorite.vue')
                }
            ]
        },
        {
            path: '/admin',
            component: AppLayout,
            meta: {
                middleware: [auth]
            },
            children: [
                {
                    path: '',
                    name: 'Dashboard',
                    component: () => import('@/views/admin/Statistical.vue')
                },
                {
                    path: 'book-manager',
                    name: 'BookManager',
                    component: () => import('@/views/admin/BookManager.vue')
                },
                {
                    path: 'author-manager',
                    name: 'AuthorManager',
                    component: () => import('@/views/admin/AuthorManager.vue')
                },
                {
                    path: 'genre-manager',
                    name: 'GenreManager',
                    component: () => import('@/views/admin/GenreManager.vue')
                },
                {
                    path: 'cart-manager',
                    name: 'CartManager',
                    component: () => import('@/views/admin/CartManager.vue')
                },
                {
                    path: 'content-manager',
                    name: 'ContentManager',
                    component: () => import('@/views/admin/ContentManager.vue')
                },
                {
                    path: 'statistical',
                    name: 'Statistical',
                    component: () => import('@/views/admin/Statistical.vue')
                },
                {
                    path: 'customer-manager',
                    name: 'CustomerManager',
                    component: () => import('@/views/admin/CustomerManager.vue')
                },
                {
                    path: 'discount',
                    name: 'discount',
                    component: () => import('@/views/admin/Discount.vue')
                }
            ]
        },
        {
            path: '/checkout',
            name: 'checkout',
            meta: {
                middleware: [auth]
            },
            component: () => import('@/views/client/Checkout.vue')
        },
        {
            path: '/payment-success',
            name: 'paymentsuccess',
            component: () => import('@/views/client/PaymentSuccess.vue')
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) return context.next;
    return (...parameters) => {
        context.next(...parameters);

        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
});
export default router;
