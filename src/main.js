import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import eventBus from './evetBus';
import store from './store';



window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    cluster: 'sa1',
    key: 'local',
    wsHost: '127.0.0.1',
    wsPort: '6001',
    forceTLS: false,
    disableStats: true,
});

const app = createApp(App);

const user = JSON.parse(store.state.user)
console.log(user?.id, 'USER')

function arraysIguais(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    // return arr1.every((elemento, indice) => elemento === arr2[indice]);
}

window.Echo.channel('user')
.listen('ChangedUser', (event) => {
    console.log(event.message.id, 'eventttt')
    if (user && event.message.id == user?.id) {
        if (!arraysIguais(user.capacidades, event.message.capacidades)) {
            console.log('mudou')
            // Atualiza o objeto global do usuário
            // console.log(event.message.capacidades, 'CAPACIDADES EVENTO')
            // user?.capacidades = event.message.capacidades
            user.capacidades = event.message.capacidades;

            console.log(user.capacidades, 'user update')
            // Atualiza o local storage
            // localStorage.setItem('user', JSON.stringify(user));
            store.dispatch('saveUser',   JSON.stringify(user) );
            
            // Emitir um evento para notificar componentes
            eventBus.emit('user-updated', event.message.capacidades);
        }
    }
});

eventBus.on('user-updated', (updatedUser) => {
    // localStorage.setItem('user', JSON.stringify(user));
    console.log(updatedUser, 123)
    location.reload()

});

app.use(router);
app.use(store);

app.mount('#app');
