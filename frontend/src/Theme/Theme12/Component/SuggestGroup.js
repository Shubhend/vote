import {Fragment} from "react";

function SuggestGroup(){

    return(
        <Fragment>

            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggest Group</h4>
                    <a href="default-group.html" className="fw-600 ms-auto font-xssss text-primary">See
                        all</a>
                </div>
                <div
                    className="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                    <img src="images/e-2.jpg" alt="img" className="img-fluid rounded-xxl mb-2"/>
                </div>
                <div className="card-body dd-block pt-0 ps-4 pe-4 pb-4">
                    <ul className="memberlist mt-1 mb-2 ms-0 d-block">
                        <li className="w20"><a href="#"><img src="images/user-6.png" alt="user"
                                                             className="w35 d-inline-block"
                                                             style={{"opacity": "1"}}/></a></li>
                        <li className="w20"><a href="#"><img src="images/user-7.png" alt="user"
                                                             className="w35 d-inline-block"
                                                             style={{"opacity": "1"}}/></a></li>
                        <li className="w20"><a href="#"><img src="images/user-8.png" alt="user"
                                                             className="w35 d-inline-block"
                                                             style={{"opacity": "1"}}/></a></li>
                        <li className="w20"><a href="#"><img src="images/user-3.png" alt="user"
                                                             className="w35 d-inline-block"
                                                             style={{"opacity": "1"}}/></a></li>
                        <li className="last-member"><a href="#"
                                                       className="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center"
                                                       style={{"height": "35px", "lineHeight": "35px"}}>+2</a>
                        </li>
                        <li className="ps-3 w-auto ms-1"><a href="#"
                                                            className="fw-600 text-grey-500 font-xssss">Member
                            apply</a></li>
                    </ul>
                </div>


            </div>


        </Fragment>

    )

}
export default SuggestGroup;