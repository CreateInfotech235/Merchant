import React, { useState } from 'react';  // Import useState for handling state
import { Link } from 'react-router-dom';
import searchIcon from "../../assets_admin/search.png";
  // Assuming searchIcon is correctly imported

const AutoMail = () => {
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [themeMode, setThemeMode] = useState('light'); // Assuming you have a state for theme mode

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  // Handler for search input change
  };

  return (
    <>
      <div className="auto-mail">
        <p className="fw-bold">Let's set up your event emails<br/>
          Create and manage your event emails at one place</p>
        <p class=".text-secondary">Invite people, set reminders to boost attendance, follow-up after an <br/> event or deep dive into email analytics. It's all done here.</p>
      </div>
      <button type="button" className="btn btn-primary">Create Custom Email</button>

      <div class="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between d-lg-flex justify-content-lg-between d-md-flex  flex-md-row justify-content-between  d-sm-flex flex-sm-column d-flex  flex-column justify-content-center align-items-center flex-lg-row flex-xl-row flex-xxl-row ">
      <div>

          <ul className="list-inline d-flex flex-wrap w-100">
          
              <li className="p-3 fw-bold ps-0 text-black">All</li>
        
              <li className="p-3 fw-bold text-black">Automated</li>
     
              <li className="p-3 fw-bold text-black">Custom</li>
    
          </ul>
        </div>
        <div className="d-xxl-flex justify-content-xxl-between d-xl-flex justify-content-xl-between d-lg-flex justify-content-lg-between d-md-flex justify-content-md-between d-sm-flex justify-content-sm-center d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-column align-items-center nav-bar pb-3">
          <div className={`navbar ${themeMode === "dark" ? "dark-mode" : ""}`}>
            <div className="navbar-options d-flex my-2 col-12">
              <input
                type="search"
                className="search-btn rounded-start-4 p-3"
                placeholder="Search your delivery"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="search-img rounded-end-4 border-0" type="button">
                <img src={searchIcon} className="search" alt="search icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
      <table class='w-100 table p-3'>
  <thead>
    <tr>
      <th class="p-3">Emails</th>
      <th class="p-3">Status</th>
      <th class="p-3">Sent To</th>
      <th class="p-3">Event State</th>
      <th class="p-3"></th>
      <th class="p-3"></th>
      <th class="p-3"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Event invitation :<span class="text-primary">Automated</span> <br/>
      Subject: subscription</th>
      <td>Active</td>
      <td>Pepole</td>
      <td>Pre-Event</td>
      <td><img src="./src/assets/show.png"/></td>
      <td><div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div></td>
<td><img src="./src/assets/menu.svg"/></td>
    </tr>

  <tr>
      <th>Event invitation :<span class="text-primary">Automated</span> <br/>
      Subject: subscription</th>
      <td>Active</td>
      <td>Pepole</td>
      <td>Pre-Event</td>
      <td><img src="./src/assets/show.png"/></td>
      <td><div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div></td>
<td><img src="./src/assets/menu.svg"/></td>
    </tr>
    <tr>
      <th>Event invitation :<span class="text-primary">Automated</span> <br/>
      Subject: subscription</th>
      <td>Active</td>
      <td>Pepole</td>
      <td>Pre-Event</td>
      <td><img src="./src/assets/show.png"/></td>
      <td><div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div></td>
<td><img src="./src/assets/menu.svg"/></td>
   
    </tr>
    <tr>
      <th>Event invitation :<span class="text-primary">Automated</span> <br/>
      Subject: subscription</th>
      <td>Active</td>
      <td>Pepole</td>
      <td>Pre-Event</td>
      <td><img src="./src/assets/show.png"/></td>
      <td><div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div></td>
<td><img src="./src/assets/menu.svg"/></td>
   
    </tr>
    <tr>
      <th>Event invitation :<span class="text-primary">Automated</span> <br/>
      Subject: subscription</th>
      <td>Active</td>
      <td>Pepole</td>
      <td>Pre-Event</td>
      <td><img src="./src/assets/show.png"/></td>
      <td><div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div></td>
<td><img src="./src/assets/menu.svg"/></td>
   
    </tr>
   
  </tbody>
</table>
      </div>
    </>
  );
}

export default AutoMail;
