import React from "react";

interface withLoadingProps {
  isLoading: boolean
  repos?: Array<List> | null
  articles?: Array<Detail> | null
}

interface List {
  Id: string;
  Title: string;
  desc: string;
  content: string;
}

interface Detail {
  Id: string;
  Title: string;
  desc: string;
  content: string;
}

function WithListLoading<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithLoadingComponent({ isLoading, ...props }: withLoadingProps) {
    if (!isLoading) return <WrappedComponent {...props as P} />
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        Hold on, fetching data may take some time :)
      </p>
    );
  };
}

export default WithListLoading;