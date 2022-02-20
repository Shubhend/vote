import {Fragment} from "react";

function StatusComponent(){

return (
    <Fragment>
        <div className="item">
            <div data-bs-toggle="modal" data-bs-target="#Modalstory"
                 className="card w125 h200 d-block border-0 shadow-none rounded-xxxl bg-dark overflow-hidden mb-3 mt-3">
                <div
                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                    <a href="#">
                                                    <span className="btn-round-lg bg-white"><i
                                                        className="feather-plus font-lg"></i></span>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Add
                            Story </h4>
                    </a>
                </div>
            </div>
        </div>

        <div className="item">
            <div data-bs-toggle="modal" data-bs-target="#Modalstory"
                 className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
                 style={{"background-image": "url(images/s-1.jpg)"}}>
                <div
                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                    <a href="#">
                        <figure
                            className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                            <img src="images/user-11.png" alt="image"
                                 className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Victor
                            Exrixon </h4>
                    </a>
                </div>
            </div>
        </div>
    </Fragment>

)



}

export default StatusComponent;