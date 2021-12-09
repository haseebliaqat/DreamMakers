import React, { useState, useEffect} from 'react';
import './winners-list.less';
import SearchIcon from '@/_assets/icons/search.svg';
import CalanderIcon from '@/_assets/icons/calander.svg';
import { SubHeader } from '@/_components/SubHeader/SubHeader';
import Accordion from '../../../_components/Accordion';
import { accountService, alertService } from '@/_services';
import SearchBar from "material-ui-search-bar";
import DatePicker from 'react-date-picker';


export const WinnersList = () => {

   // const [winners, setWinners] = useState([
   //    {
   //       id: 0,
   //       title: 'September 6, 2021 (3 Winners)',
   //       description: '',
   //       childs: [
   //          {
   //             id: 0,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //          {
   //             id: 1,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //          {
   //             id: 2,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //       ],
   //    },
   //    {
   //       id: 1,
   //       title: 'September 7, 2021 (3 Winners)',
   //       description: '',
   //       childs: [
   //          {
   //             id: 0,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //          {
   //             id: 1,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //          {
   //             id: 2,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //       ],
   //    },
   //    {
   //       id: 2,
   //       title: 'September 9, 2021 (3 Winners)',
   //       description: '',
   //       childs: [
   //          {
   //             id: 0,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //          {
   //             id: 1,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //          {
   //             id: 2,
   //             title: 'Muhammad Zubair | Won A Trip to Maldives',
   //             description: 'Finally I will be able to relax with my family somewhere nice without worrying about',
   //          },
   //       ],
   //    },
   // ]);
   const [winners, setAllWinners] = React.useState([]);
   const [Filter, setAllFilterWinners] = React.useState([]);
   const [search_value, setSearchWinnersDate] = useState(new Date());
   const GetAllWinners =()=> {
      alertService.clear();
      accountService.WinnerList().then((resp) => {
         setAllWinners(resp);

      }).catch(error => {
          alertService.error("Internal Server Error");
      });
    }
    useEffect(() => {
      GetAllWinners();

  }, []);
  const handleChange = () => {
   setSearchWinnersDate(search_value);
   };
   const handleChangeSerach = () => {
      setSearchWinnersDate(search_value);
      };
  
   return (
      console.log(winners),
      <div id="winners-list">
         <SubHeader title="Winners" />
         {/* <div className="d-flex align-items-center justify-content-center py-4">
            <div className="winner-input-container">
                  <SearchBar
                     placeholder="Search winners"
                     className="winner-input"
                     // value={this.state.value}
                     // onChange={(newValue) => this.setState({ value: newValue })}
                     // onRequestSearch={() => doSomethingWith(this.state.value)}
                     onChange={handleChangeSerach} 
                  >
               <SearchIcon  />
            </SearchBar>
               <input
                  type="text"
                  placeholder="Search winners"
                  className="winner-input"
               />
               <button><img src={SearchIcon} alt="search-icon" className="img-fluid"   /></button>
            </div>
            <span className="d-inline-block ml-3">
               <img src={CalanderIcon} alt="winner-icon" />
            </span>
            <div className="winner-input-container">
            <DatePicker
               onChange={handleChange}
               value={search_value}
               className="winner-search-input"
            />
            </div>
            
         </div> */}
         <div className="question-container">
            <Accordion isWinners={true} items={winners} />
         </div>
      </div>
   );
};
