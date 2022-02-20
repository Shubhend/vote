import {Fragment} from "react";

function Image(){

    return(
        <Fragment>
            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3"><img src="images/user-8.png" alt="image"
                                                         className="shadow-sm rounded-circle w45"/>
                    </figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hour ago</span>
                    </h4>
                    <a href="#" className="ms-auto"><i
                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                </div>
                <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                    <a href="default-video.html" className="video-btn">
                        <video autoPlay loop className="float-right w-100">
                            <source src="images/v-1.mp4" type="video/mp4"/>
                        </video>
                    </a>
                </div>
                <div className="card-body p-0 me-lg-5">
                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                        rhoncus <a href="#" className="fw-600 text-primary ms-2">See more</a></p>
                </div>
                <div className="card-body d-flex p-0">
                    <a href="#"
                       className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"><i
                        className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>
                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                        Like</a>
                    <div className="emoji-wrap">
                        <ul className="emojis list-inline mb-0">
                            <li className="emoji list-inline-item"><i className="em em---1"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-angry"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-anguished"></i>
                            </li>
                            <li className="emoji list-inline-item"><i className="em em-astonished"></i>
                            </li>
                            <li className="emoji list-inline-item"><i className="em em-blush"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-clap"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-cry"></i></li>
                            <li className="emoji list-inline-item"><i
                                className="em em-full_moon_with_face"></i></li>
                        </ul>
                    </div>
                    <a href="#"
                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span
                        className="d-none-xss">22 Comment</span></a>
                    <a href="#"
                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                        className="d-none-xs">Share</span></a>
                </div>
            </div>


        </Fragment>

    )

}

export default Image;