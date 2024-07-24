import ResourceCard from "../ResourceCard/ResourceCard";
import "./ResourceList.scss";

export default function ResourceList(props) {
  const { resources, selectResource } = props;

  return (
    <section className="resourceList" aria-label="Resource List">
      <div className="resourceList__wrapper" role="list">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              selectResource={selectResource}
            />
          ))
        ) : (
          <p>No resources available for this category.</p>
        )}
      </div>
    </section>
  );
}
