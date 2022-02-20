import ConfirmFriend from "./Component/ConfirmFriend";
import SuggestGroup from "./Component/SuggestGroup";
import SuggestPage from "./Component/SuggestPage";
import FriendRequest from "./Component/FriendRequest";
import StatusComponent from "./Component/StatusComponent";
import CreatePost from "./Component/CreatePost";
import TextPost from "./Component/Post/TextPost";
import Image from "./Component/Post/Image";
import ScrollPost from "./Component/Post/ScrollPost";


const Feed =() =>{

    return(
        <div className="main-content right-chat-active" >

            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left" >



                    <div className="row feed-body">
                        <div className="col-xl-8 col-xxl-9 col-lg-8">


                            <div className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                                <div className="owl-carousel category-card owl-theme overflow-hidden nav-none">

                                    <StatusComponent/>

                                </div>
                            </div>


                            <CreatePost/>



                            <TextPost/>
                            <Image/>







                            <ScrollPost/>




                        </div>





                        <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">


                       <FriendRequest/>
                         <ConfirmFriend/>



                      <SuggestGroup/>


                            <SuggestPage/>
                        </div>

                    </div>
                </div>

            </div>
        </div>

)
}

export default Feed;