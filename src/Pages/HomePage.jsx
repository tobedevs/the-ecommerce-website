import { Header } from '../Component/header.jsx'
import { Main } from '../Component/Main.jsx'
import { Navigator } from '../Component/Navigator.jsx'


export default function HomePage() {
  return (
    <div className='overflow-x-clip'>
        <Header />
        <Main />
        <Navigator />
    </div>
  )
}
