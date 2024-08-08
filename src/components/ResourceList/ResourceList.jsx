import ResourceCard from "../ResourceCard/ResourceCard";
import "./ResourceList.scss";

export default function ResourceList({ resources, selectResource, activeResourceId, commentCounts }) {
  return (
    <section className="resourceList" aria-label="Resource List">
      <div className="resourceList__wrapper" role="list">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              selectResource={selectResource}
              isActive={resource.id === activeResourceId}
              commentCount={(commentCounts && commentCounts[resource.id]) || 0}
            />
          ))
        ) : (
          <p>No resources available for this category.</p>
        )}
      </div>
    </section>
  );
}