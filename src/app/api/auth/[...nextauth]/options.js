import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
export const options = {
  // providers are which ever u want in our we use only githib and google u can use which one u want
  // in provider we have to define our login system like how we have to take user
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub", profile);

        let userRole = "GitHub User";

        if (profile?.email == "ahmadukkash47@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    CredentialsProvider({
      name: "Credentials",
      // this for creating form 
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      // now we are checking what user enter 
      async authorize(credentials) {
        try {
          // finding user
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

            // checking user password 
          if (foundUser) {
            console.log("User Exists");
            const checkPassword = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            // deleting password from local
            if (checkPassword) {
              console.log("good pas");
              delete foundUser.password;

              // just for show nothing importent
              foundUser['role'] = "Unverified Email";
              return foundUser
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // Modify the JWT token (JSON Web Token)
    // from server side
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // Modify the user session
    // from client side
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
