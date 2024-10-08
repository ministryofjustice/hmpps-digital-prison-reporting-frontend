import type { RequestHandler, Router } from 'express'
import { Services } from '../types/Services'

const mockUser = {
  username: 'RDOWTHWAITE_GEN',
  active: true,
  name: 'Ross Dowthwaite',
  authSource: 'nomis',
  staffId: 487629,
  activeCaseLoadId: 'KMI',
  userId: '487629',
  uuid: '5651801a-7990-4b97-887c-95180e37edf3',
  displayName: 'Ross Dowthwaite',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhtcHBzLWF1dGgtZGV2LTIwMjMwMzA2In0.eyJzdWIiOiJSRE9XVEhXQUlURV9HRU4iLCJ1c2VyX25hbWUiOiJSRE9XVEhXQUlURV9HRU4iLCJhdXRoX3NvdXJjZSI6Im5vbWlzIiwiaXNzIjoiaHR0cHM6Ly9zaWduLWluLWRldi5obXBwcy5zZXJ2aWNlLmp1c3RpY2UuZ292LnVrL2F1dGgvaXNzdWVyIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QUklTT04iLCJST0xFX0RFTEVURV9TRU5TSVRJVkVfQ0FTRV9OT1RFUyIsIlJPTEVfUFJJU09OU19SRVBPUlRJTkdfVE9PTFNfVVNFUiIsIlJPTEVfR0xPQkFMX1NFQVJDSCIsIlJPTEVfSU5BQ1RJVkVfQk9PS0lOR1MiLCJST0xFX1BSSVNPTlNfUkVQT1JUSU5HX1VTRVIiLCJST0xFX0FERF9TRU5TSVRJVkVfQ0FTRV9OT1RFUyJdLCJjbGllbnRfaWQiOiJzdHUtcGVnZyIsInVzZXJfdXVpZCI6IjU2NTE4MDFhLTc5OTAtNGI5Ny04ODdjLTk1MTgwZTM3ZWRmMyIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiNDg3NjI5Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5hbWUiOiJSb3NzIERvd3Rod2FpdGUiLCJleHAiOjE3MjgzMTE1ODIsImp0aSI6Imt1eVF2RzRveUY1c3JvRVBya0VnVVlZR0w4NCJ9.LTCvWnWxA5M4PoE8HRHGMg7roud1ML-I6hIkPssnnvFeInO59PGu3A1OVMwZUMXAwFalQJ2YbKQjuKOWyakFQdp4K5LzgZCxyv2jimTBCtn7UAB8ZloJseBP4X_A_E_bSIMJUIkNYs-sjFCx0DLfEKyf7dpgMmNLuKcISgbHUT3tSGRLIxYrQJSri6Fj8JoeW5t1MOZ7lQ8r47JJwY9wL0WRVsPJ-QDBbM11MKj2Y-xmhPTWg1YRm7nOHF0BxPuENxebPOVhb4FlPzLfRSg6TbvZCLDnqost4JBOAhm7Wu0RaD38XKJ5GbHMbuWvfo_f7jnG_wQQmIq0hUnRBj7rTQ',
}

export default function routes({
  router,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  layoutPath: string
  services: Services
  templatePath?: string
}) {
  const feedbackFormHandler: RequestHandler = async (req, res, next) => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const { reportId, variantId } = req.params
    try {
      res.locals.user = mockUser
      res.render(`${templatePath}feedback-form`, {
        title: 'Feedback Form',
        user: res.locals.user,
        report: {
          reportId,
          variantId,
        },
        csrfToken,
        layoutPath,
        postEndpoint: '/submitFeedback/',
      })
    } catch (error) {
      next()
    }
  }

  const feedbackSubmitHandler: RequestHandler = async (req, res, next) => {
    const { body } = req
    console.log(body)

    res
  }

  router.get('/download/:reportId/:variantId/feedback', feedbackFormHandler)
  router.post('/submitFeedback/', feedbackSubmitHandler)
}
