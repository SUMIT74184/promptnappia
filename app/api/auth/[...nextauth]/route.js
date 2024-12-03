import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // This callback is triggered after a successful login
    async session({ session }) {
      // Ensure the session user exists in the database
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      } else {
        // If user is not found, we could handle the case or log the user out
        session.user.id = null;
      }

      return session;
    },

    // This callback is triggered when the user is signing in
    async signIn({ profile }) {
      try {
        // Ensure we're connecting to the DB only once
        await connectToDB();

        // Check if the user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If the user doesn't exist, create a new one
        if (!userExists) {
          await User.create({
            email:profile.email,
            username:profile.name.replace(" ","").toLowerCase(),
            image:profile.picture
          })
        }

        return true;
      } catch (error) {
        console.log("Error during sign-in: ", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
