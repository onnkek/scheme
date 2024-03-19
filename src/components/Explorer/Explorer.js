import React from "react";
import "./Explorer.css"
import nodeIcon from '../../assets/icons/node.svg'
import folderIcon from '../../assets/icons/folder.svg'
import branchIcon from '../../assets/icons/branch.svg'
import branchIcon2 from '../../assets/icons/branch2.svg'
import switchIcon from '../../assets/icons/switch.svg'
import transIcon from '../../assets/icons/trans.svg'
import genIcon from '../../assets/icons/gen.svg'
import loadIcon from '../../assets/icons/load.svg'

const Explorer = ({ }) => {

  //console.log(`render PropertiesBar`)

  return (
    <div className="explorer">
      {/* BETA */}
      <div style={{ color: "red", fontWeight: 900, padding: "50px 0px", display: "flex", justifyContent: "center", fontSize: "20px" }}>
        <div style={{ border: "1px solid red", padding: "5px 15px", borderRadius: "4px", backgroundColor: "#fdafaf" }}>BETA, DONT WORK</div>
      </div>
      {/* BETA */}
      <div className="explorer__list">

        <div className="explorer__list-baseroot">
          <div className="explorer__list-item">
            <div className="explorer__list-item-arrow explorer__list-item-arrow_open">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
            <div className="explorer__list-item-icon">
              <img src={folderIcon} />
            </div>
            <div className="explorer__list-item-title">Scheme</div>
          </div>

          <div className="explorer__list-root">
            <div className="explorer__list-item">
              <div className="explorer__list-item-arrow explorer__list-item-arrow_open">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="explorer__list-item-icon">
                <img src={folderIcon} />
              </div>
              <div className="explorer__list-item-title">Nodes</div>
            </div>
            <div className="explorer__list-root">
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={nodeIcon} />
                </div>
                <div className="explorer__list-item-title">Node 1</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={nodeIcon} />
                </div>
                <div className="explorer__list-item-title">Node 2</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={nodeIcon} />
                </div>
                <div className="explorer__list-item-title">Node 3</div>
              </div>
            </div>
          </div>

          <div className="explorer__list-root">
            <div className="explorer__list-item">
              <div className="explorer__list-item-arrow explorer__list-item-arrow_open">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="explorer__list-item-icon">
                <img src={folderIcon} />
              </div>
              <div className="explorer__list-item-title">Branches</div>
            </div>
            <div className="explorer__list-root">
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={branchIcon2} />
                </div>
                <div className="explorer__list-item-title">Branch 1</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={branchIcon2} />
                </div>
                <div className="explorer__list-item-title">Branch 2</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={branchIcon2} />
                </div>
                <div className="explorer__list-item-title">Branch 3</div>
              </div>
            </div>
          </div>


          <div className="explorer__list-root">
            <div className="explorer__list-item">
              <div className="explorer__list-item-arrow explorer__list-item-arrow_open">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="explorer__list-item-icon">
                <img src={folderIcon} />
              </div>
              <div className="explorer__list-item-title">Switches</div>
            </div>
            <div className="explorer__list-root">
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={switchIcon} />
                </div>
                <div className="explorer__list-item-title">Switch 1</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={switchIcon} />
                </div>
                <div className="explorer__list-item-title">Switch 2</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={switchIcon} />
                </div>
                <div className="explorer__list-item-title">Switch 3</div>
              </div>
            </div>
          </div>

          <div className="explorer__list-root">
            <div className="explorer__list-item">
              <div className="explorer__list-item-arrow explorer__list-item-arrow_open">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="explorer__list-item-icon">
                <img src={folderIcon} />
              </div>
              <div className="explorer__list-item-title">Transformers</div>
            </div>
            <div className="explorer__list-root">
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={transIcon} />
                </div>
                <div className="explorer__list-item-title">Transformer 1</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={transIcon} />
                </div>
                <div className="explorer__list-item-title">Transformer 2</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={transIcon} />
                </div>
                <div className="explorer__list-item-title">Transformer 3</div>
              </div>
            </div>
          </div>

          <div className="explorer__list-root">
            <div className="explorer__list-item">
              <div className="explorer__list-item-arrow explorer__list-item-arrow_open">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="explorer__list-item-icon">
                <img src={folderIcon} />
              </div>
              <div className="explorer__list-item-title">Generators</div>
            </div>
            <div className="explorer__list-root">
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={genIcon} />
                </div>
                <div className="explorer__list-item-title">Generator 1</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={genIcon} />
                </div>
                <div className="explorer__list-item-title">Generator 2</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={genIcon} />
                </div>
                <div className="explorer__list-item-title">Generator 3</div>
              </div>
            </div>
          </div>

          <div className="explorer__list-root">
            <div className="explorer__list-item">
              <div className="explorer__list-item-arrow explorer__list-item-arrow_open">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="explorer__list-item-icon">
                <img src={folderIcon} />
              </div>
              <div className="explorer__list-item-title">Loads</div>
            </div>
            <div className="explorer__list-root">
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={loadIcon} />
                </div>
                <div className="explorer__list-item-title">Load 1</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={loadIcon} />
                </div>
                <div className="explorer__list-item-title">Load 2</div>
              </div>
              <div className="explorer__list-item">
                <div className="explorer__list-item-arrow"></div>
                <div className="explorer__list-item-icon">
                  <img src={loadIcon} />
                </div>
                <div className="explorer__list-item-title">Load 3</div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Explorer;