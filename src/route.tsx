import { createBrowserRouter } from 'react-router'

import { Layout } from './components/layout'
import { Detail } from './detail'
import { Home } from './home'
import { NotFound } from './notFaound'


const router = createBrowserRouter ([{

    element:<Layout/>,
    children : [
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/detail/:cripto",
            element:<Detail/>
        },
        {
            path:"*",
            element:<NotFound/>
        }
    ]


}])

export { router }

