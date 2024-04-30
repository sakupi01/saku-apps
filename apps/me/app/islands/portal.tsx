import { Grid, Heading } from "@yamada-ui/react";
import PortalGridChild from "../components/portal-grid-child";
import { FaXTwitter } from "react-icons/fa6";
import { SiZenn } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { LiaFlaskSolid } from "react-icons/lia";
import { IoMailOutline } from "react-icons/io5";

export default function Portal() {
  return (
    <>
      <Grid
        w="full"
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap="md"
        overflowX={"scroll"}
      >
        <PortalGridChild
          minW="300"
          colStart={1}
          colEnd={3}
          rowStart={1}
          rowEnd={3}
          gradColor="primaryGrad"
          url="/about"
        >
          <Heading color="textBase" as="h2" size="3xl" isTruncated>
            About
          </Heading>
        </PortalGridChild>
        <PortalGridChild
          maxW="150"
          colSpan={1}
          rowSpan={1}
          gradColor="githubGrad"
          url={import.meta.env.VITE_GITHUB_URL}
        >
          <FaGithub color="#2D2613" size="60" title="GitHub" />
        </PortalGridChild>
        <PortalGridChild
          maxW="150"
          colSpan={1}
          rowSpan={1}
          gradColor="xGrad"
          url={import.meta.env.VITE_X_URL}
        >
          <FaXTwitter color="#2D2613" size="50" title="twitter" />
        </PortalGridChild>
        <PortalGridChild
          maxW="150"
          colSpan={1}
          rowSpan={1}
          gradColor="zennBlueGrad"
          url={import.meta.env.VITE_ZENN_URL}
        >
          <SiZenn color="#2D2613" size="50" title="zenn" />
        </PortalGridChild>
        <PortalGridChild
          maxW="150"
          colSpan={1}
          rowSpan={1}
          gradColor="blogGrad"
          url={import.meta.env.VITE_BLOG_URL}
        >
          <Heading color="textBase" as="h2" size="2xl" isTruncated>
            Blog
          </Heading>
        </PortalGridChild>
        <PortalGridChild
          maxW="150"
          colSpan={1}
          rowSpan={1}
          gradColor="contactGrad"
        >
          <IoMailOutline color="#2D2613" size="50" title="mail" />
        </PortalGridChild>
        <PortalGridChild
          maxW="150"
          colSpan={1}
          rowSpan={1}
          gradColor="experimentsGrad"
          url="/experiments"
        >
          <LiaFlaskSolid color="#2D2613" size="60" title="experiments" />
        </PortalGridChild>
      </Grid>
    </>
  );
}
