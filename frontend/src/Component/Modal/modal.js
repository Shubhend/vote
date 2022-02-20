import Inputs from "../Form/inputs";
import React, {Fragment} from "react";


export const ModalBlock = (props)=>{



  return (
      <Fragment>


          <div className="modal bottom fade" style={{"overflow-y": "scroll"}} id="Modallogin" tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content border-0">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close text-grey-500"></i></button>
                      <div className="modal-body p-3 d-flex align-items-center bg-none">
                          <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                              <div className="card-body rounded-0 text-left p-3">
                                  <h2 className="fw-700 display1-size display2-md-size mb-4">{props.title}</h2>

dfsdgsd g sdgsdg

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>





      </Fragment>

  )







}


