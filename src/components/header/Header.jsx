import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { Placeholder } from "react-select/animated";

function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef=useRef();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])

  const controlNavbar=()=>{
   
    if(window.scrollY>200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide")
      }else{
        setShow("show")
    }
  }
  else{
   setShow("top")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener("scroll",controlNavbar)

    return ()=>{
      window.removeEventListener("scroll",controlNavbar)
    }
  },[lastScrollY ])

  const searchQueryHandler = (event) => {
    console.log("here we are")
    if (event.key === "Enter" && query.length > 0) {
      setQuery('');
      let timeoutId=setTimeout(() => {
        setShowSearch(false)
      }, 100);
      navigate(`/search/${query}`);
    }
    
  };

  const openSearch=()=>{
   setTimeout(()=>{
    inputRef.current.focus();
   },0)
    setMobileMenu(false);
    setShowSearch(true)
  }

  const opneMobileMenu=()=>{
    setMobileMenu(true);
    setShowSearch(false)
  }

  const navigationHandler=(type)=>{
    if(type==="movie"){
      navigate("/explore/movie")
    }
    else{
      navigate("/explore/tv")
    }
  }

  console.log(query);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=>navigate("/")}>
          <img src={logo} alt="" />
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={()=> navigationHandler("movie")}>movie</li>
            <li className="menuItem" onClick={()=> navigationHandler("tv")}>Tv shows</li>
            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch}/>
            {
              mobileMenu ? <VscChromeClose onClick={()=>setMobileMenu(false)}/> :<SlMenu onClick={opneMobileMenu}/>
            }
          </div>
       
      </ContentWrapper>
      {
        showSearch && <div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
            <input
              ref={inputRef}
              placeholder={query === '' ? "Enter the movie name here" : ''}
              value={query || ''} // Ensure controlled component by always providing a value 
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <VscChromeClose onClick={()=>setShowSearch(false)}/>
          </div>
        </ContentWrapper>
      </div>
      }
    </header>
  );
}

export default Header;
