import ResourceCard from "../ResourceCard/ResourceCard";
import "./ResourceList.scss";
import { useEffect } from "react";

export default function ResourceList({
  resources,
  selectResource,
  activeResourceId,
  commentCounts,
}) {
  useEffect(() => {
    resources.forEach((resource) => {
      resource.commentCount = commentCounts[resource.id] || 0;
    });
  }, [resources, commentCounts]);

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
              commentCount={resource.commentCount}
            />
          ))
        ) : (
          <p>No resources available for this category.</p>
        )}
      </div>
    </section>
  );
}