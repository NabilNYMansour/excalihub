import { Container } from "@mantine/core";

const Page = () => {
  return <Container>
    <h1>Privacy Policy and Terms of Service</h1>
    <h2>What license do my drawings have?</h2>
    <p>All the drawings you create in Excalihub are owned by you. You decide which license applies to every drawing you create.
      We recommend you paste your preferred license inside your description, if you don't place a license on a drawing,
      it will be protected by <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.</a>
    </p>
    <p>
      On top of any license you might want to apply to your drawings, you agree to give Excalihub a worldwide license to host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display such content, for the limited purpose of operating, promoting, and improving Excalihub.
    </p>

    <h2>Your Public Information</h2>
    <p>Excalihub is a public platform. As such, all the drawings and content you share as "Public" becomes visible to everybody. In particular,</p>
    <ul>
      <li>
        Content shared as <b>"Public"</b> is visible to anyone and will contain the title, description and username of its creator. It is also indexed by search engines.
      </li>
      <li>
        Content kept as <b>"Private"</b> is not shared with anybody, as described below in the Privacy Policy.
      </li>
    </ul>

    <h2>Your Private Information</h2>
    <p>
      Excalihub respects the privacy of its users and will not use data in its databases to compete with its users, market to its user's clients, advertise to, or contact them for any other means of profit.
    </p>

    <p>
      Excalihub collects email addresses and usernames. It uses clerk for authentication and stores the email address and username of its users. It also stores the content of the drawings you create, as well as the title and description of each drawing.
    </p>

    <p>
      All private information, including email address and private drawings and content (see above), is never shared with or sold to any other organizations or services.
    </p>

    <p>
      Excalihub does however reserve the right to react according to the law and authorities and investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of the Terms of Service (section below), or as otherwise required by law.
    </p>

    <p>
      Excalihub has implemented processes to guarantee the security of your data to the best of the capabilities of generally available technologies. Each user is assigned a unique username, which is required to access their account. It is your responsibility to protect the security of your login information.
    </p>

    <p>
      You have the right to access all of your private information. Send us an email to <a href="mailto:nabilnymansour@gmail.com">nabilnymansour@gmail.com</a> for a readable version of your data.
    </p>

    <h2>Cookies and Analytics</h2>
    <p>
      Cookies are required to use Excalihub, they are used to help the system identify users and mantain their session open while they work in the website. Without cookies Excalihub won't operate.
    </p>
    <p>
      Excalihub does not use cookies to track any of the users actions in the site, or store any of the content they type of search for.
    </p>
    <p>
      Excalihub collects global, non user-specific information regarding overal website traffic volume, frequency of visits, type of browser and operating system. Excalihub employes both Google Analytics and an Excalihub proprietary analytic system.
    </p>

    <h2>Terminating your Account</h2>
    <p>In the case you decide to delete your Excalihub account, all the content you created and your profile will be deleted. Excalihub runs the cleanup scripts at when you request deletion.</p>

    <h2>Changes to This Policy</h2>
    <p>
      Excalihub's Privacy Policy may change from time to time. Excalihub will not reduce its user's rights under this policy without explicit consent. Excalihub will post any privacy policy changes on this page and, if the changes are significant, Excalihub will provide a more prominent notice.
    </p>
    <p>
      If Excalihub is acquired by or merged with another company, Excalihub will notify the user before any personal information is transferred and becomes subject to a different privacy policy.
    </p>

    <h2>Terms of Service</h2>
    <p>
      You must be at least 13 years old in order to use Excalihub. If Excalihub becomes aware that you aren't, and that therefore we have unknowingly collected some personal information about you, we will delete your account without further notice.
    </p>
    <p>
      Excalihub is not responsible for the content you create. You are responsible for that content. Excalihub reserves the right to suspend any user account without further notice and, in the same way, Excalihub reserves the right to block any drawings or assets without further notice. We encourage freedom of speech and diversity of opinions and believes, but we will not tolerate content that threatens people or communities.
    </p>
    <p>
      Excalihub or its contributors are not responsible for content shared on the website that can potentially damage hardware and/or software. The user agrees that the web is a delicate technology and you will assume all the risk when browsing, playing or editing the drawings. However, Excalihub is fully committed to provide a good browsing experience.
    </p>
    <p>
      Although Excalihub owns the data storage, databases and the Excalihub site, the users retain all rights to their creations and can decide a specific license for it (section "What license will my drawings have?" above).
    </p>

    <h2>Excalihub Uses</h2>
    <ul>
      <li>
        <a href="https://github.com/excalidraw/excalidraw">Excalidraw</a>: for the drawing canvas.
      </li>
      <li>
        <a href="https://nextjs.org/">Next.js</a>: for the website framework.
      </li>
      <li>
        <a href="https://mantine.dev/">Mantine</a>: for the UI components.
      </li>
      <li>
        <a href="https://clerk.com/">Clerk</a>: for the authentication system.
      </li>
    </ul>
  </Container>;
};

export default Page;