import Loading from './Loading'
let vm
const install = (vue) => {
  let Component = vue.extend(Loading)
  vm = new Component({
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      show() {
        this.isLoading = true
      },
      hide() {
        this.isLoading = false
      }
    }
  })
  vm.$mount(document.createElement('div'))
  document.body.appendChild(vm.$el)
}
const show = () => vm.show()
const hide = () => vm.hide()
export default {
  install,
  show,
  hide
}
