import ResourceCard from "../ResourceCard/ResourceCard";
import "./ResourceList.scss";

export default function ResourceList(props) {
  const { resources, selectResource } = props;

  return (
    <section className="resourceList" aria-label="Resource List">
      <div className="resourceList__wrapper" role="list">
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
