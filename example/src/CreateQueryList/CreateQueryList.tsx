import React, { useEffect, useState } from 'react';
import { inject, observer, Observer } from 'mobx-react';
import { QueryItems } from '../mobx/models/QueryItems';
import { List } from 'antd';
import CreateQueryListItem from './CreateQueryListItem';
import { useLocationQuery } from 'react-use-location-query';

interface Props {
	queryItems?: QueryItems;
}

const CreateQueryList = ({ queryItems }: Props) => {
	const [defaultValues, setDefaultVsalues] = useState({});

	const {} = useLocationQuery(defaultValues);

	useEffect(() => {
		const newDefaultValues: any = {};

		queryItems!.items.forEach((item) => {
			newDefaultValues[item.name] = {
				type: item.type,
				default: item.default,
				hideIfDefault: item.hideIfDefault
			};
		});
		setDefaultVsalues(newDefaultValues);
	}, [JSON.stringify(queryItems!.items)]);

	return (
		<List
			dataSource={queryItems!.items}
			renderItem={(item) => <CreateQueryListItem item={item} />}
		/>
	);
};

export default inject('queryItems')(observer(CreateQueryList));
