import { Heading } from "@yamada-ui/react";
import PortalItem from "@/components/portal-item";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiZenn } from "react-icons/si";
import { IoMailOutline } from "react-icons/io5";
import { LiaFlaskSolid } from "react-icons/lia";

export const nodeTypes = {
  aboutItem: () => (
    <PortalItem minW="300" gradColor="primaryGrad" url="/about">
      <Heading color="textBase" as="h2" size="3xl" isTruncated>
        About
      </Heading>
    </PortalItem>
  ),
  githubItem: () => (
    <PortalItem
      minW="150"
      gradColor="githubGrad"
      url={import.meta.env.VITE_GITHUB_URL}
    >
      <FaGithub color="#2D2613" size="60" title="GitHub" />
    </PortalItem>
  ),
  xItem: () => (
    <PortalItem minW="150" gradColor="xGrad" url={import.meta.env.VITE_X_URL}>
      <FaXTwitter color="#2D2613" size="50" title="twitter" />
    </PortalItem>
  ),
  zennItem: () => (
    <PortalItem
      minW="150"
      gradColor="zennBlueGrad"
      url={import.meta.env.VITE_ZENN_URL}
    >
      <SiZenn color="#2D2613" size="50" title="zenn" />
    </PortalItem>
  ),
  blogItem: () => (
    <PortalItem
      minW="150"
      gradColor="blogGrad"
      url={import.meta.env.VITE_BLOG_URL}
    >
      <Heading color="textBase" as="h2" size="2xl" isTruncated>
        Blog
      </Heading>
    </PortalItem>
  ),
  contactItem: () => (
    <PortalItem minW="150" gradColor="contactGrad">
      <IoMailOutline color="#2D2613" size="50" title="mail" />
    </PortalItem>
  ),
  experimentsItem: () => (
    <PortalItem minW="150" gradColor="experimentsGrad" url="/experiments">
      <LiaFlaskSolid color="#2D2613" size="60" title="experiments" />
    </PortalItem>
  ),
};
