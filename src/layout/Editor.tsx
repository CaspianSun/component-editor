import { defineComponent } from 'vue'
import { Header } from './Header'
import { Canvas } from './Canvas'
import { Footer } from './Footer'

export const Editor = defineComponent({
  setup() {
    return () => {
      return (
        <div class={'flex full bg-#f7f7f9 flex-col'}>
          <Header></Header>
          <div class={'flex-1 flex-center'}>
            <Canvas></Canvas>
          </div>
          <Footer></Footer>
        </div>
      )
    }
  },
})
export default Editor
