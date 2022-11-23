import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import styles from '../../StyleSheets/WelcomePage.module.css'
import { selectLogged, selectIsStaff, selectIsSuperuser, selectUser_id } from '../../Slices/loginSlice'
import { setAdminStand } from '../../Slices/standsSlice'

// This component is the welcome page - the first page a user see's when entring the website.
// the button in this component are being updated according the the user's type.
const WelcomePage = () => {
  const dispatch = useDispatch()
  const logged = useSelector(selectLogged)
  const isStaff = useSelector(selectIsStaff)
  const is_superuser = useSelector(selectIsSuperuser);
  const user_id = useSelector(selectUser_id);

  return (
    <div >
      <div className={styles.welcomePageContainer}>

        <div>
          <div className={styles.backgroundImageContainer}>
            <img src="./BackgroundPhotos/F_M2.jpeg" alt=""
              className={styles.rightImage} />

            <div className={styles.btnsContainer}>
              <Link to="/about" >
                <div className={styles.aboutBtn} >
                  <div className="animate__animated animate__bounceInUp" style={{ animationDuration: "2s", animationDelay: "0.7s" }}>
                    <button className={styles.button_btn} >About This Project</button>
                  </div>
                </div>
              </Link>

              <Link to="/allstands">
                <div className={styles.goToShopBtn}>
                  <div className="animate__animated animate__bounceInUp" style={{ animationDuration: "2s", animationDelay: "0.85s" }}>
                    <button className={styles.button_btn} >Go to the Market</button>
                  </div>
                </div>
              </Link>

              {!logged && (
                <>
                  <Link to="/auth">
                    <div className={styles.loginBtn}>
                      <div className="animate__animated animate__bounceInUp" style={{ animationDuration: "2s", animationDelay: "1s" }}>
                        <button className={styles.button_btn}>Register / Login</button>
                      </div>
                    </div>
                  </Link></>
              )}

              {logged && !isStaff && !is_superuser && (<>
                <Link to="/standregister">
                  <div className={styles.registerStandBtn}>
                    <div className="animate__animated animate__bounceInUp" style={{ animationDuration: "2s", animationDelay: "1s" }}>
                      <button className={styles.button_btn} >Open Your Own Stand </button>
                    </div>
                  </div>
                </Link>
              </>)}

              {logged && isStaff && !is_superuser && (<>
                <Link to="/standadmin">
                  <div className={styles.manageStandBtn}>
                    <div className="animate__animated animate__bounceInUp" style={{ animationDuration: "2s", animationDelay: "1s" }}>
                      <button
                        className={styles.button_btn}
                        onClick={() => dispatch(setAdminStand(user_id))}>Manage Your Stand
                      </button>
                    </div>
                  </div>
                </Link>
              </>)}

              {is_superuser && (
                <Link to="/webadmin">
                  <div className={styles.manageStandBtn}>
                    <div className="animate__animated animate__bounceInUp" style={{ animationDuration: "2s", animationDelay: "1s" }}>
                      <button className={styles.button_btn} >Administration Panel </button>
                    </div>
                  </div>
                </Link>
              )}

            </div>
          </div>
        </div>

        <div className={styles.welcomeTitleContainer}>
          <div className="animate__animated animate__fadeIn" style={{ animationDuration: "3s" }}>
            <h4 className={styles.welcomeTitle}>Welcome </h4>
          </div>
          <div className="animate__animated animate__fadeIn" style={{ animationDuration: "3s", animationDelay: "0.5s" }}>
            <h4 className={styles.toTitle}> to </h4>
          </div>
        </div>

        <div className={styles.mainTitleContainer}>
          <div className="animate__animated animate__fadeIn" style={{ animationDuration: "3.5s", animationDelay: "1s" }}>
            <h2 className={styles.mainTitle}>The Farmer's<br />Market <span className={styles.onlineSpan}>Online</span></h2>
          </div>

        </div>
      </div>
    </div >
  )
}

export default WelcomePage