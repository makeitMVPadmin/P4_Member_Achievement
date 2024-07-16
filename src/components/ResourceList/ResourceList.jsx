import ResourceCard from "../ResourceCard/ResourceCard";
import "./ResourceList.scss";

export default function ResourceList(props) {
  const { resources, selectResource } = props;

  return (
    <section className="resourceList">
      <div className="resourceList__wrapper">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            selectResource={selectResource}
          />
        ))}
      </div>
    </section>
  );
}
