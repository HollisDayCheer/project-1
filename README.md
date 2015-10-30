	Frando is a way for people to sign up for, or create, events. It allows users to sign up for events created by other users, and allows for real time updates so that they will always be aware of what is going on. It keeps this stuff anonymous, so no one needs to be worried about who else is going to these things. Essentially it allows for forced social interaction for those who are too scared to approach people on their own but willing to do it.

	frando.herokuapp.com.

	I had my wireframes drawn out on paper, but I waited too long to do this readme and cannot find them anymore. They mostly looked like what I have though, but some of the pages had a navbar at the top instead of just a sidebar link thing on the left, which I found to be unnecessary given the sidebar. 

	user stories

	Again, my user stories were on paper and I have lost them. They went something like: 

	Albert wants to go on Frando to make a friend. He signs up for an event, and gets randomly paired with someone.

	Beth wants to introduce people to her small business, so she makes a host account on frando and then lets users sign up for it.

	Cory signed up for a lot of events but has lost track of which ones he is going to, so he can look at the past events that he has already signed up for to make sure he hasn't missed any.

	Entity relationship diagram

	I am not entirely sure what this means, but I have Users, Hosts, and Events. Users store events, events stores Users. 

	API: Only my own api. I had implemented Traitify but it was too specific so I stopped implementing it.

	Libraries:  dotenv, I had nodemailer but it wasn't entirely working, bcrypt, and socket.io.

	Wishlist: Get some sort of personality test feature there and have the piarings actually happen. 