import * as React from 'react';
import { Notification } from 'baseui/notification';
import { useStyletron } from 'baseui';
import { Button, KIND } from 'baseui/button';
import TriangleDown from 'baseui/icon/triangle-down';
import { StatefulMenu } from 'baseui/menu';
import { Pagination } from 'baseui/pagination';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
  StyledAction,
} from 'baseui/table';
import { ProgressBar } from "baseui/progress-bar";
import Show from 'baseui/icon/show';
import Plus from 'baseui/icon/plus';
import Delete from 'baseui/icon/delete';
import Overflow from 'baseui/icon/overflow';
import Header from "./Header";

function PaginatedTable(props) {
  const [css, theme] = useStyletron();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);
  const handlePageChange = (nextPage) => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(props.data.length / limit)) {
      return;
    }
    setPage(nextPage);
  };
  const handleLimitChange = (nextLimit) => {
    const nextPageNum = Math.ceil(props.data.length / nextLimit);
    if (nextPageNum < page) {
      setLimit(nextLimit);
      setPage(nextPageNum);
    } else {
      setLimit(nextLimit);
    }
  };
  const window = () => {
    const min = (page - 1) * limit;
    return props.data.slice(min, min + limit);
  };
  const notificationOverrides = {
    Body: { style: { width: 'auto', margin: "1rem .5rem" } },
  };
  return (
    <React.Fragment>
      <div className={css({ height: props.height || '600px', marginBottom: "10px", marginTop: "10px" })}>
        <StyledTable>
          <Header title={props.title} actions={props.actions} sub={props.sub} />
          {props.isLoading && <ProgressBar infinite />}
          <StyledHead >
            {props.columns.map((c) => { return <StyledHeadCell className={css({ backgroundColor: "#F9F9FA" })} key={c}>{c}</StyledHeadCell> })}
          </StyledHead>
          <StyledBody >
            {props.error && <Notification
              kind="negative"
              overrides={notificationOverrides}
            >
              Something went wrong: {props.error}
            </Notification>}
            {props.data && props.data.length < 1 && !props.error && <Notification
              overrides={notificationOverrides}
            >
              No {props.title} avaliable
            </Notification>}
            {window().map((row, index) => (
              <StyledRow key={index}>
                {row.map((r) => {
                  if (typeof (r) === "object" && r instanceof Array) {
                    return <StyledCell>
                      {r.map(({ action, handler }) => {
                        switch (action) {
                          case "view":
                            return <StyledAction key={action}>
                              <Show size={24} onClick={handler} />
                            </StyledAction>
                          case "delete":
                            return <StyledAction key={action}>
                              <Delete size={24} onClick={handler} />
                            </StyledAction>
                          case "add":
                            return <StyledAction key={action}>
                              <Plus size={24} onClick={handler} />
                            </StyledAction>
                          default:
                            return <StyledAction key={action}>
                              <Overflow size={24} onClick={handler} />
                            </StyledAction>
                        }
                      })}
                    </StyledCell>

                  }
                  else {
                    return <StyledCell key={r}>{r}</StyledCell>
                  }
                })}

              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>

      </div>
      <div
        className={css({
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
          paddingRight: theme.sizing.scale800,
          paddingLeft: theme.sizing.scale800,
          display: props.hidePagination ? 'none' : 'flex',
          justifyContent: 'space-between',
        })}
      >
        <StatefulPopover
          content={({ close }) => (
            <StatefulMenu
              items={Array.from({ length: 100 }, (_, i) => ({
                label: i + 1,
              }))}
              onItemSelect={({ item }) => {
                handleLimitChange(item.label);
                close();
              }}
              overrides={{
                List: {
                  style: { height: '150px', width: '100px' },
                },
              }}
            />
          )}
          placement={PLACEMENT.bottom}
        >
          <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
            {`${limit} Rows`}
          </Button>
        </StatefulPopover>
        <Pagination
          currentPage={page}
          numPages={Math.ceil(props.data.length / limit)}
          onPageChange={({ nextPage }) => handlePageChange(nextPage)}
        />
      </div>
    </React.Fragment>
  );
}
export default function Table({ title, columns, data, actions, isLoading, height, hidePagination, error, sub }) {
  const subValue = sub === undefined ? true : sub;
  return <PaginatedTable height={height} columns={columns} data={data} title={title} actions={actions} isLoading={isLoading} hidePagination={hidePagination} error={error} sub={subValue} />;
}