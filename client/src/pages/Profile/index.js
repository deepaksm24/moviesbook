import React from 'react'
import {Tabs} from "antd"
import { useDispatch,useSelector} from "react-redux";
import PageTitle from "../../components/pagetitle"
import Thetreslist from './thetreslist';
import Bookings from './Bookings';

function Profile() {
  return (
    <div>
     <PageTitle title={"Profile"}/>

     <Tabs defaultActiveKey='1'
      size = "large" >

        <Tabs.TabPane tab="Bookings" key="1">
        <Bookings/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2">
            <Thetreslist/>
        </Tabs.TabPane>

      </Tabs>
    </div>
  )
}

export default Profile
