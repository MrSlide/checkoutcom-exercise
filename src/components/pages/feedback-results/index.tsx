import React from 'react'

import FloatingBoxLayout from '../../../layouts/floating-box'
import Section from '../../section'
import TitleWithAction from '../../title-with-action'
import Title from '../../title'
import SubTitle from '../../subtitle'
import Paragraph from '../../paragraph'
import RatingsChart from '../../ratings-chart'
import CommentList from '../../comment-list'
import Comment from '../../comment'
import RouterLink from '../../router-link'
import useMostRecentComments from '../../../hooks/use-most-recent-comments'
import useRatingsCount from '../../../hooks/use-ratings-count'

import type { FeedbackComment, FeedbackRatingsCount} from '../../../types/feedback'

export interface Props {
  mostRecentComments: FeedbackComment[],
  ratingsCount: FeedbackRatingsCount,
}

export default function ResultsPage(props: Props): React.ReactElement {
  const ratingsCount = useRatingsCount(props.ratingsCount)
  const mostRecentComments = useMostRecentComments(props.mostRecentComments)

  return (
    <main>
      <Section>
        <TitleWithAction
          action={<RouterLink href='/'>Go back</RouterLink>}
        >
          <Title>Feedback Results</Title>
        </TitleWithAction>

        {typeof ratingsCount.error === 'undefined'
          ? <RatingsChart data={ratingsCount.data}/>
          : <Paragraph>It was not possible to load the ratings.</Paragraph>}
      </Section>

      <Section off>
        <SubTitle>Latest Comments</SubTitle>

        {typeof mostRecentComments.error === 'undefined'
          ? <CommentList>
            {mostRecentComments.data.map(function (comment) {
              return (
                <Comment
                  author={comment.createdBy}
                  comment={comment.comment}
                  key={comment.id}
                />
              )
            })}
          </CommentList>
          : <Paragraph>It was not possible to load the latest comments.</Paragraph>}
      </Section>
    </main>
  )
}

ResultsPage.getLayout = function getLayout(page: React.ReactNode): React.ReactNode {
  return (
    <FloatingBoxLayout>
      {page}
    </FloatingBoxLayout>
  )
}
