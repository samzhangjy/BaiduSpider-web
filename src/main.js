import { createApp } from 'vue'
import App from './App.vue'
import './style/bui.css'
import router from './router'
import Button from './components/Button'
import Input from './components/Input'
import InputBox from './components/InputBox'
import Card from './components/Card'
import Container from './components/Container'
import Navbar from './components/Navbar'
import Pagination from './components/Pagination'
import Tab from './components/Tab'
import 'boxicons'

const app = createApp(App)

app.use(router)

app.component('bd-button', Button)
app.component('bd-input', Input)
app.component('bd-inputbox', InputBox)
app.component('bd-card', Card)
app.component('bd-container', Container)
app.component('bd-navbar', Navbar)
app.component('bd-pagination', Pagination)
app.component('bd-tab', Tab)

app.mount('#app')
