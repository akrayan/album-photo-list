import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import Container from '../components/Container'

const styles = StyleSheet.create({
    containerList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'flex-start',
    }
})

export default function CustomList({ data, otherData, renderItem, renderEmpty, refreshing, onRefresh, keyExtractor, ...props }) {
    return (
        <ScrollView contentContainerStyle={styles.contentContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    data?.length > 0 ?
                        <View>{data.map((item, index) => <View key={keyExtractor(item)}>{renderItem({ item: item, index: index, otherData: otherData })}</View>)}</View>
                        : renderEmpty()
                }
        </ScrollView>)
}