import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import { db, auth } from "./Firebase";
import { makeStyles, Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ImageUpload from "./components/ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing[(2, 4, 3)],
  },
}));

function App() {
  const classses = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };
  const signIn = (event) => {
    event.preventDefault()
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  
  }
  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classses.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classses.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
         {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>
     

      <h2>Welcome to Instagram</h2>
<div className="app__posts">
  <div className="app__postLeft">
  {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          avatar={post.avatar}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
  </div>
  <div className="app__postRight">
  <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
  </div>
     
</div>

      

       {user?.displayName ? (
      <ImageUpload username={user.displayName} />

      ): (
        <h3>Sorry you need to login to upload</h3>
      )}
      {/* <Post 
      avatar="https://instagram.ffru7-1.fna.fbcdn.net/v/t51.2885-19/s150x150/69618039_2931467010325543_256918934987472896_n.jpg?_nc_ht=instagram.ffru7-1.fna.fbcdn.net&_nc_ohc=AJGDAX73y8cAX-XZorG&oh=ea86f2aedff4bac16606a1c9e605b8c1&oe=5F4A6F04" username="bektur_muratov_king" 
      caption="my project is  avalaible" 
      imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--INXm52ys--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-media-1.freecodecamp.org/images/kbYsxsxb2D7mBhdlEmUrpMhRmOcQoR79vtT1"/>
      <Post 
      avatar="https://upload.wikimedia.org/wikipedia/commons/0/0c/Fatih_Sultan_Mehmed_Han_-_%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D9%86_%D9%85%D8%AD%D9%85%D8%AF_%D8%AE%D8%A7%D9%86_%D8%A7%D9%84%D9%81%D8%A7%D8%AA%D8%AD.jpg"
      username="abdusamad_ahi" 
      caption="Üsküdar'a gider iken" 
      imageUrl="https://wonderfulturkey.files.wordpress.com/2017/05/sultan_murad_iii-e1501107964330.jpg?w=1200"/>
         <Post 
      avatar="data:image/jpeg;base64,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" 
      username="2pac" 
      caption="Changes" 
      imageUrl="data:image/jpeg;base64,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" 
      /> */}
    </div>
  );
}

export default App;
