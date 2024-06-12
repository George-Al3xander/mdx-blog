import React from "react"
import Image from "next/image"
import "./grid.css"
const { storyBehindProject, story, ourMission, ourValues } = {
  storyBehindProject:
    "Welcome to Strength Chronicles, your ultimate destination for powerlifting knowledge and resources. We aim to create a comprehensive archive that supports and inspires powerlifters at every stage of their journey.",

  story:
    "Strength Chronicles was born from a love of powerlifting and the need for a centralized resource hub. We created Strength Chronicles to gather the best articles, programs, and resources in one place, making it easier for lifters to find the information they need. Our journey is fueled by the inspiring stories of strength and perseverance within the powerlifting community.",

  ourMission:
    "Our mission at Strength Chronicles is to empower powerlifters with the knowledge and tools they need to achieve their goals. We provide comprehensive resources that cover all aspects of powerlifting, ensuring high-quality information is accessible to everyone, from beginners to elite athletes. We aim to foster a supportive community where lifters can connect, share experiences, and learn from each other.",

  ourValues:
    "We strive to provide the highest quality content and resources, ensuring our users have access to reliable information. Integrity is at our core, and we aim to inspire lifters by sharing stories of perseverance and success. We are dedicated to continually enhancing our offerings and staying up-to-date with the latest in powerlifting.",
}

const TextBlock = ({ title, content }: { title: string; content: string }) => (
  <>
    <h3 /*className="text-2xl font-bold capitalize"*/>{title}</h3>
    <p /*className="opacity-60"*/>{content}</p>
  </>
)

function StoryGridSection() {
  return (
    <ul className="story-grid-section">
      <li id={"one"}>
        <h2 className="text-sm uppercase text-blue-400">welcome</h2>
        <TextBlock
          title="The Story Behind Project"
          content={storyBehindProject}
        />
      </li>
      <li id={"two"}>
        <TextBlock title="story" content={story} />
        <span className={"flex h-[8rem] overflow-hidden"}>
          <Image
            width={640}
            className={"h-full w-full object-cover"}
            height={426}
            src={"/assets/img/ph_about_1.jpg"}
            alt={"Man wrapping wrists"}
          />
        </span>
      </li>
      <li className="mission-block" id={"three"}>
        <TextBlock title={"Our mission"} content={ourMission} />
      </li>
      <li id={"four"}>
        <TextBlock title="Our value" content={ourValues} />
      </li>
    </ul>
  )
  // return (
  //
  // <ul className="flex gap-10">
  // <ul className="flex flex-col gap-10">
  //       <li className="basis-[100%] p-4" id="one">
  //         <h3 className="text-sm uppercase text-blue-400">welcome</h3>
  //         <h2 className="text-3xl capitalize">the story behind project</h2>
  //         <p className="opacity-60">{storyBehindProject}</p>
  //       </li>
  //       <li className="basis-[60%] bg-gray-300 p-4 font-black" id="two">
  //         <TextBlock content={story} title={"story"} />
  //         <span className={"flex h-[10rem] overflow-hidden"}>
  //           <Image
  //             width={640}
  //             className={"h-full w-full object-cover"}
  //             height={426}
  //             src={"/assets/img/ph_about_1.jpg"}
  //             alt={"Man wrapping wrists"}
  //           />
  //         </span>
  //       </li>
  //     </ul>
  //     <ul className="flex flex-col gap-4">
  //       <li
  //         className="mission-block pt-auto relative flex basis-[100%] flex-col justify-end gap-4 p-10"
  //         id="three"
  //       >
  //         <TextBlock content={ourMission} title={"Our mission"} />
  //         <Image
  //           width={640}
  //           className={
  //             "absolute left-0 top-0 -z-20 h-full w-full object-cover opacity-60 blur-[3px]"
  //           }
  //           height={426}
  //           src={"/assets/img/ph_about_2.jpg"}
  //           alt={"Man get's up"}
  //         />
  //         <span className="absolute left-0 top-0 -z-10 h-full w-full bg-blue-600 opacity-50" />
  //       </li>
  //       <li className="basis-[60%] p-4" id="four">
  //         <TextBlock content={ourValues} title={"Our Value"} />
  //       </li>
  //     </ul>
  //   </ul>
  // )
}

export default StoryGridSection
