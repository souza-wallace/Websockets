// eventBus.js
import { reactive } from 'vue';

const eventBus = reactive({
    events: {},
    emit(event, data) {
        console.log(event, 'event emit')
        console.log(data, 'data emit')

        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].forEach(callback => callback(data));
    },
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
});

export default eventBus;
