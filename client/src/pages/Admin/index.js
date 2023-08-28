import React from 'react'
import Pagetitle from '../../components/pagetitle'
import{Tabs} from "antd"
import Theatrelist from './Theatrelist'
import Movieslist from './Movieslist'


function Admin() {
  return (
    <div>
      <Pagetitle title="Admin"/>
      <Tabs defaultActiveKey='1'
      size = "large" >

        <Tabs.TabPane tab="Movies" key="1">
        <Movieslist/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2">
            <Theatrelist/>
        </Tabs.TabPane>

      </Tabs>
    </div>
  )
}

export default Admin
